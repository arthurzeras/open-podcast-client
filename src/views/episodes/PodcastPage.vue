<template>
  <div id="podcast-page" class="container-fluid">
    <div class="row">
      <div class="col-4">
        <div class="podcast-info">
          <div class="row">
            <div class="col-4">
              <img
                class="img-fluid"
                :src="podcastActive.image"
                :alt="`Logo ${podcastActive.name}`"
              >
            </div>
            <div class="col">
              <h1 class="podcast-title">
                {{ podcastActive.name }}
              </h1>
              <p>{{ podcastActive.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <episodes-list :podcast-active="podcastActive" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EpisodesList from './EpisodesList'

export default {
  name: 'PodcastPage',
  components: {
    EpisodesList
  },
  computed: {
    ...mapState('podcasts', ['podcastList']),
    podcastActive () {
      if (this.podcastList.length) {
        return this.podcastList.filter(p => (
          p.id === parseInt(this.$route.params.id)
        ))[0]
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

#podcast-page {
  .podcast-info {
    .podcast-title {
      font-size: 20pt;
      color: $main;
    }
  }
}
</style>
