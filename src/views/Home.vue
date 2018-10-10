<template>
  <div class="container-fluid">
    <div id="podcasts">
      <h1 class="category-title">
        <i class="material-icons">flash_on</i>
        Podcasts em destaque
      </h1>
      <div class="row">
        <div
          :key="index"
          class="col-2"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
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
    ...mapActions('podcasts', ['LoadPodcasts'])
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';

.category-title {
  font-size: 20pt;
  border-bottom: 1px solid $main-dark;
}

#podcasts {
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
</style>
