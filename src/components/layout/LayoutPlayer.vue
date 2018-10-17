<template>
  <div
    id="player"
    v-if="playerVisible"
    :class="{ 'loading-media': loadingMedia }"
  >
    <audio
      ref="audioEl"
      @abort="totalTime = 0"
      :src="podcastData.source"
      @canplaythrough="audioIsReady()"
    />

    <div
      ref="playerBar"
      class="player-bar"
      @click="changeCurrentTime($event)"
    />
    <div
      ref="progressBar"
      class="player-bar-indicator"
      @click="changeCurrentTime($event)"
    />
    <div
      ref="progressPoint"
      class="player-bar-point"
    />

    <div class="row text-center no-gutters player-container">
      <div class="col podcast-info">
        <div class="row no-gutters">
          <div class="col flex-center">
            <img
              :src="podcastData.image"
              class="img-fluid"
              alt="Logo do podcast"
            >
          </div>
          <div class="podcast-info-labels col-10">
            <div
              class="podcast-episode-title"
              v-abreviar-texto:70="podcastData.episodeName"
            />
            <div class="podcast-title">
              {{ podcastData.podcastName }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-5 player-main flex-center-column">
        <div class="player-time flex-center">
          <span v-formatar-tempo="currentTime"></span>&nbsp;|&nbsp;
          <span v-formatar-tempo="totalTime"></span>
        </div>
        <div class="player-controls flex-center">
          <div
            class="material-icons"
            @click="rewindForward(-10)"
          >
            replay_10
          </div>
          <div class="material-icons" @click="playPause()" v-if="!loadingMedia">
            {{ isPlaying ? 'pause' : 'play_arrow' }}
          </div>
          <div class="material-icons animate-loading" v-else>
            sync
          </div>
          <div
            class="material-icons"
            @click="rewindForward(+10)"
          >
            forward_10
          </div>
        </div>
      </div>
      <div class="col player-details flex-center">
        <div class="row no-gutters w-100">
          <div class="col-8">
            <div class="player-volume row no-gutters">
              <div class="col flex-center">
                <span
                  @click="muteOnOff()"
                  class="material-icons"
                >
                  {{ volumeIcon }}
                </span>
              </div>
              <div class="col-10 flex-center">
                <span
                  ref="volumeBar"
                  class="volume-bar"
                  @click="changeVolume($event)"
                />
                <span
                  ref="volumeIndicator"
                  class="volume-bar-indicator"
                  @click="changeVolume($event)"
                  :style="{ width: volumePercent }"
                />
                <span
                  ref="volumePoint"
                  class="volume-bar-point"
                  :style="{ left: volumePercent }"
                />
              </div>
            </div>
          </div>
          <div class="col flex-center">
            <div class="material-icons">favorite</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LayoutPlayer',
  data () {
    return {
      volume: 1,
      totalTime: 0,
      currentTime: 0,
      interval: null,
      isPlaying: false,
      loadingMedia: false,
      podcastData: {
        id: '',
        image: '',
        source: '',
        episodeName: '',
        podcastName: ''
      }
    }
  },
  created () {
    this.$root.$on('Player::play', payload => {
      this.loadingMedia = true
      const { podcastData } = this
      podcastData.id = payload.id
      podcastData.image = payload.image
      podcastData.source = payload.source
      podcastData.podcastName = payload.podcastName
      podcastData.episodeName = payload.episodeName
    })

    this.$root.$on('Player::pause', () => {
      this.playPause()
    })
  },
  watch: {
    // playerVisible () {
    //   if (this.playerVisible) {
    //     document.querySelector('#app').style.paddingBottom = '90px'
    //   } else {
    //     document.querySelector('#app').style.paddingBottom = '0'
    //   }
    // }
  },
  computed: {
    volumePercent () {
      return `${this.volume * 100}%`
    },
    volumeIcon () {
      const { volume } = this
      if (!volume) {
        return 'volume_off'
      } else if (volume >= 0.5) {
        return 'volume_up'
      } else {
        return 'volume_down'
      }
    },
    playerVisible () {
      return this.podcastData.source
    }
  },
  methods: {
    ...mapActions('player', ['SetEpisodePlaying']),
    audioIsReady () {
      if (!this.totalTime) {
        const { progressBar, progressPoint, audioEl } = this.$refs
        progressBar.style.width = 0
        progressPoint.style.left = 0
        this.currentTime = 0

        this.volume = audioEl.volume
        this.totalTime = audioEl.duration
        this.loadingMedia = false
        this.playPause()
      }
    },
    playPause () {
      const { audioEl, progressBar, progressPoint } = this.$refs

      if (audioEl.paused) {
        audioEl.play()
        this.isPlaying = true
        this.totalTime = audioEl.duration

        this.SetEpisodePlaying(this.podcastData)

        this.interval = setInterval(() => {
          const currentTime = parseInt(audioEl.currentTime)
          this.currentTime = currentTime === this.currentTime
            ? this.currentTime
            : currentTime

          const percent = (this.currentTime * 100) / this.totalTime
          progressBar.style.width = `${percent}%`
          progressPoint.style.left = `${percent}%`
        }, 100)
      } else {
        audioEl.pause()
        this.isPlaying = false
        this.SetEpisodePlaying({})
        clearInterval(this.interval)
      }
    },
    changeCurrentTime (ev) {
      const {
        audioEl,
        playerBar,
        progressBar,
        progressPoint
      } = this.$refs

      const clickedPoint = ev.offsetX
      let fullWidth = ev.target.offsetWidth

      if (ev.target === progressBar) {
        fullWidth = playerBar.offsetWidth
      }

      const percent = (clickedPoint * 100) / fullWidth
      progressBar.style.width = `${percent}%`
      progressPoint.style.left = `${percent}%`

      audioEl.currentTime = (percent * audioEl.duration) / 100
      this.currentTime = (percent * audioEl.duration) / 100
    },
    rewindForward (value) {
      const { audioEl } = this.$refs

      this.currentTime += value
      audioEl.currentTime += value

      if (this.currentTime < 10 && value === -10) {
        this.currentTime = 0
      }

      if (this.currentTime + 10 > this.totalTime) {
        this.currentTime = this.totalTime
      }
    },
    changeVolume (ev) {
      const {
        audioEl,
        volumeBar,
        volumeIndicator
      } = this.$refs

      const clickedPoint = ev.offsetX
      let fullWidth = ev.target.offsetWidth

      if (ev.target === volumeIndicator) {
        fullWidth = volumeBar.offsetWidth
      }

      const percent = (clickedPoint * 100) / fullWidth

      audioEl.volume = percent / 100
      this.volume = percent / 100
    },
    muteOnOff () {
      if (this.volume) {
        this.volume = 0
        this.$refs.audioEl.volume = 0
      } else {
        this.volume = 1
        this.$refs.audioEl.volume = 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

@mixin bar($color) {
  width: 100%;
  height: 4px;
  display: block;
  cursor: pointer;
  position: relative;
  background-color: $color;
}

@mixin bar-indicator() {
  left: 0;
  height: 4px;
  cursor: pointer;
  transition: .4s;
  position: absolute;
  background-color: $main;
}

@mixin bar-point() {
  left: 0;
  width: 10px;
  z-index: 100;
  height: 10px;
  display: block;
  transition: .4s;
  cursor: pointer;
  position: absolute;
  border-radius: 100%;
  background-color: $main;
  border: 1px solid $white;
}

#player {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: $dark;
  &.loading-media {
    opacity: .5;
    pointer-events: none;
  }

  .player-bar {
    @include bar($main-dark);
  }
  .player-bar-indicator {
    @include bar-indicator();
    top: 0;
  }
  .player-bar-point {
    @include bar-point();
    top: -3px;
  }

  .material-icons {
    transition: .4s;
    cursor: pointer;
    &:hover {
      color: $main;
    }
  }

  .player-container {
    .col, [class*="col-"] {
      height: 70px;
    }
    .podcast-info {
      padding-left: 15px;
      img {
        width: 100%;
      }
      .podcast-info-labels {
        display: flex;
        text-align: left;
        padding-left: 10px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .podcast-title {
          font-size: 10pt;
        }
      }
    }
    .player-main {
      .player-time {
        font-weight: bold;
        margin-top: 5px;
      }
      .player-controls {
        height: 70px;
        .material-icons {
          font-size: 25pt;
          padding: 0 10px;
        }
      }
    }
    .player-details {
      .player-volume {
        .material-icons {
          cursor: pointer;
          &:hover {
            color: $main;
          }
        }
        .volume-bar {
          @include bar($darker)
        }
        .volume-bar-indicator {
          @include bar-indicator();
        }
        .volume-bar-point {
          @include bar-point();
        }
      }
    }
  }
}
</style>
