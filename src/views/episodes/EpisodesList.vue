<template>
  <div id="episodes-list">
    <div class="form-group">
      <input
        autofocus
        type="text"
        @input="searchData($event)"
        class="form-control form-control-lg"
        placeholder="Busque podcasts, episódios, etc"
      >
    </div>

    <div class="no-results" v-if="!episodesList.length && !!search">
      Nenhum resultado para <span class="term">{{ search }}</span>.
    </div>
    <h1 v-else>Episódios</h1>

    <div class="episode-list" ref="episodeList">
      <template v-if="loading">
        <div
          :key="i"
          v-for="i in 7"
          class="episode-item-loading"
        >
          <div class="skeleton-loading"/>
          <div class="skeleton-loading"/>
        </div>
      </template>
      <div
        v-else
        :key="index"
        class="episode-item"
        @click="playEpisode(episode)"
        v-for="(episode, index) in episodesList"
        :class="{'playing': playingNow(episode.id)}"
      >
        <i class="material-icons mr-2 play-icon">
          {{ playingNow(episode.id) ? 'pause_circle_outline' : 'play_circle_outline' }}
        </i>
        <div>{{ episode.name }}</div>
      </div>
      <div class="loading-scroll text-main" v-if="loadingScroll">
        <i class="material-icons animated bounce infinite">mic</i>
      </div>
      <transition name="fade">
        <button
          @click="scrollListTop()"
          v-show="showBtnScrollTop"
          class="btn btn-main btn-scroll-top"
        >
          <i class="material-icons">expand_less</i>
        </button>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'EpisodesList',
  props: {
    podcastActive: {
      type: Object
    }
  },
  data () {
    return {
      search: '',
      loading: false,
      loadingScroll: false,
      showBtnScrollTop: false
    }
  },
  created () {
    this.getData({ loading: true })
  },
  mounted () {
    this.$refs.episodeList.addEventListener('scroll', ev => {
      this.scrollList(ev)
    })
  },
  computed: {
    ...mapState('player', ['playing']),
    ...mapGetters('podcasts', ['isLastPage']),
    ...mapState('podcasts', ['episodesList', 'currentPage'])
  },
  methods: {
    ...mapActions('podcasts', ['LoadEpisodes', 'ResetEpisodesList']),
    async getData (config = {}) {
      this.loading = config.loading

      const payload = {
        ...config.filter,
        id: this.$route.params.id
      }

      await this.LoadEpisodes(payload)

      this.loading = false
      this.loadingScroll = false
    },
    async pushData () {
      this.loadingScroll = true

      const payload = {
        filter: {
          search: this.search,
          page: this.currentPage + 1
        }
      }

      this.getData(payload)
    },
    searchData (ev) {
      const currentVal = ev.target.value
      setTimeout(async () => {
        if (currentVal === ev.target.value) {
          this.search = currentVal

          if (!currentVal) {
            this.ResetEpisodesList()
            this.getData()
          } else {
            this.ResetEpisodesList()

            const payload = {
              q: currentVal,
              id: this.$route.params.id
            }

            await this.LoadEpisodes(payload)
          }
        }
      }, 1000)
    },
    playEpisode (episode) {
      if (!this.playingNow(episode.id)) {
        const payload = {
          id: episode.id,
          episodeName: episode.name,
          source: episode.link_audio,
          image: this.podcastActive.image,
          podcastName: this.podcastActive.name
        }

        this.$root.$emit('Player::play', payload)
      } else {
        this.$root.$emit('Player::pause')
      }
    },
    scrollListTop () {
      this.$refs.episodeList.scrollTo({
        'top': 0,
        'left': 0,
        'behavior': 'smooth'
      })
    },
    scrollList (ev) {
      const { episodeList } = this.$refs
      const height = episodeList.scrollHeight - episodeList.clientHeight
      const scrolled = episodeList.scrollTop

      let percent = +((scrolled * 100) / height).toFixed(2)

      this.showBtnScrollTop = percent > 5

      if (percent > 90 && !this.loadingScroll && !this.isLastPage) {
        this.pushData()
      }
    },
    playingNow (id) {
      return id === this.playing.id
    }
  },
  beforeDestroy () {
    this.ResetEpisodesList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

#episodes-list {
  h1 {
    font-size: 20pt;
    color: $main;
    border-bottom: 1px solid $main-dark;
  }
  .episode-list {
    overflow-y: auto;
    max-height: calc(100vh - 270px);
    .episode-item-loading {
      width: 100%;
      display: flex;
      padding: 7px 0;
      border-bottom: 1px solid $main-dark;
      :first-child {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        background-color: $dark-low;
      }
      :last-child {
        width: 100%;
        height: 15px;
        background-color: $dark-low;
      }
    }
    .episode-item {
      display: flex;
      transition: .4s;
      cursor: pointer;
      padding: 10px 5px;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid $main-dark;
      &.playing {
        color: $main;
      }
      &:hover {
        background-color: $dark;
      }
      .play-icon {
        transition: .4s;
        &:hover {
          color: $main;
        }
      }
    }
    .loading-scroll {
      text-align: center;
      padding: 20px 0;
    }
    .btn-scroll-top {
      right: 50px;
      z-index: 1000;
      position: fixed;
      top: calc(100vh - 200px);
      border-radius: 100% !important;
      .material-icons {
        line-height: 1.4
      }
    }
  }
}
</style>
