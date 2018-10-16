<template>
  <div id="episodes-list">
    <h1>Episódios</h1>
    <div class="episode-list" ref="episodeList">
      <template v-if="loading">
        <div
          :key="i"
          v-for="i in 7"
          class="episode-item-loading"
        >
          <div class="skeleton-loading"></div>
          <div class="skeleton-loading"></div>
        </div>
      </template>
      <div
        v-else
        :key="index"
        class="episode-item"
        @click="playEpisode(episode)"
        v-for="(episode, index) in episodesList"
      >
        <i class="material-icons mr-2 play-icon">play_circle_outline</i>
        <div>{{ episode.name }}</div>
      </div>
      <div class="loading-scroll text-main" v-if="loadingScroll">
        <i class="material-icons animated bounce infinite">mic</i>
      </div>
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
      loading: false,
      loadingScroll: false
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.$refs.episodeList.addEventListener('scroll', ev => {
      this.scrollList(ev)
    })
  },
  computed: {
    ...mapGetters('podcasts', ['isLastPage']),
    ...mapState('podcasts', ['episodesList', 'currentPage'])
  },
  methods: {
    ...mapActions('podcasts', ['LoadEpisodes', 'ResetEpisodesList']),
    async getData () {
      this.loading = true
      await this.LoadEpisodes({ id: this.$route.params.id })
      this.loading = false
    },
    async pushData () {
      this.loadingScroll = true

      const payload = {
        id: this.$route.params.id,
        page: this.currentPage + 1
      }

      await this.LoadEpisodes(payload)

      this.loadingScroll = false
    },
    playEpisode (episode) {
      const payload = {
        episodeName: episode.name,
        source: episode.link_audio,
        image: this.podcastActive.image,
        podcastName: this.podcastActive.name
      }

      this.$root.$emit('Player::play', payload)
    },
    scrollList (ev) {
      const { episodeList } = this.$refs
      const height = episodeList.scrollHeight - episodeList.clientHeight
      const scrolled = episodeList.scrollTop

      let percent = +((scrolled * 100) / height).toFixed(2)

      if (percent > 90 && !this.loadingScroll && !this.isLastPage) {
        this.pushData()
      }
    }
  },
  beforeDestroy () {
    console.log('show')
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
    max-height: calc(100vh - 200px);
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
  }
}
</style>
