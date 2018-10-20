<template>
  <div class="container-fluid">
    <search-podcasts/>

    <h1 class="category-title">
      <i class="material-icons">flash_on</i>
      Podcasts em destaque
    </h1>

    <podcasts-list :list="tenFirst" :loading="loading" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PodcastsList from '../../modules/podcasts/PodcastsList'
import SearchPodcasts from '../search/components/SearchPodcasts'

export default {
  components: {
    PodcastsList,
    SearchPodcasts
  },
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.getData()
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
    async getData () {
      this.loading = true

      await this.LoadPodcasts()

      this.loading = false
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
</style>
