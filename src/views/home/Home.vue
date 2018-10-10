<template>
  <div class="container-fluid">
    <search-podcasts/>

    <div id="podcasts">
      <h1 class="category-title">
        <i class="material-icons">flash_on</i>
        Podcasts em destaque
      </h1>
      <div class="row">
        <router-link
          :key="index"
          class="col-2 podcast-link"
          :to="navigateLink(podcast)"
          v-for="(podcast, index) in tenFirst"
        >
          <div class="podcast-card">
            <div class="podcast-image">
              <img
                class="img-fluid"
                :src="podcast.image"
                :alt="`Logo ${podcast.name}`"
              >
            </div>
            <h3 class="podcast-title">
              {{ podcast.name }}
            </h3>
            <p
              class="podcast-description"
              v-abreviar-texto:40="podcast.description"
            />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SearchPodcasts from './SearchPodcasts'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    SearchPodcasts
  },
  created () {
    this.LoadPodcasts()
  },
  computed: {
    ...mapState('podcasts', ['podcastList']),
    tenFirst () {
      if (this.podcastList.length) {
        const podcasts = JSON.parse(JSON.stringify(this.podcastList))
        return podcasts.slice(0, 6)
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions('podcasts', ['LoadPodcasts']),
    navigateLink (podcast) {
      return {
        name: 'episodes-list',
        params: {
          id: podcast.id
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

.category-title {
  font-size: 20pt;
  border-bottom: 1px solid $main-dark;
}

#podcasts {
  .podcast-link {
    color: $light;
    .podcast-card {
      position: relative;
      border-radius: 2px;
      margin-bottom: 15px;
      .podcast-image {
        margin-bottom: 5px;
      }
      .podcast-title {
        color: $main;
        font-size: 12pt;
      }
      .podcast-description {
        font-size: 10pt;
      }
    }
  }
}
</style>
