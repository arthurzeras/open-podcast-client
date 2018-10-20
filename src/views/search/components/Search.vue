<template>
  <div class="container-fluid">
    <search-podcasts/>

    <podcasts-list
      :list="podcastList"
      :loading="loading"
      v-if="podcastList.length || loading"
    />

    <div class="no-results" v-else>
      Nenhum resultado para <span class="term">{{ $route.query.q }}</span>.
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SearchPodcasts from './SearchPodcasts'
import PodcastsList from '@/modules/podcasts/PodcastsList'

export default {
  name: 'Search',
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
    ...mapState('podcasts', ['podcastList'])
  },
  methods: {
    ...mapActions('podcasts', ['LoadPodcasts']),
    async getData () {
      this.loading = true

      await this.LoadPodcasts({
        q: this.$route.query.q
      })

      this.loading = false
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.getData()
  }
}
</script>
