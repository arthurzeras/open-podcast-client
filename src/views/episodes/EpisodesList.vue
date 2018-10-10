<template>
  <div id="episodes-list">
    <h1>Episódios</h1>
    <div class="episode-list">
      <div
        :key="index"
        class="episode-item"
        @click="playEpisode(episode)"
        v-for="(episode, index) in episodesList"
      >
        <i class="material-icons mr-2 play-icon">play_circle_outline</i>
        <div>{{ episode.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'EpisodesList',
  props: {
    podcastActive: {
      type: Object
    }
  },
  created () {
    this.LoadEpisodes({ id: this.$route.params.id })
  },
  computed: {
    ...mapState('podcasts', ['episodesList'])
  },
  methods: {
    ...mapActions('podcasts', ['LoadEpisodes']),
    playEpisode (episode) {
      const payload = {
        episodeName: episode.name,
        source: episode.link_audio,
        image: this.podcastActive.image,
        podcastName: this.podcastActive.name
      }

      this.$root.$emit('Player::play', payload)
    }
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
  }
}
</style>
