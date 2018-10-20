<template>
  <div id="search-podcasts">
    <input
      autofocus
      type="text"
      ref="input"
      @input="searchData($event)"
      class="form-control form-control-lg"
      placeholder="Busque podcasts, episódios, etc"
    >
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchPodcasts',
  data () {
    return {
      search: ''
    }
  },
  mounted () {
    const { q } = this.$route.query
    this.search = q || ''
    this.$refs.input.value = q || ''
  },
  computed: {
    ...mapState('podcasts', ['searchQuery'])
  },
  methods: {
    ...mapActions('podcasts', ['UpdateSearchQuery']),
    searchData (ev) {
      const currentVal = ev.target.value
      setTimeout(async () => {
        if (currentVal === ev.target.value) {
          this.search = currentVal
          // this.UpdateSearchQuery(currentVal)

          if (!currentVal) {
            this.$router.push({ name: 'home' })
          } else {
            this.$router.push({
              name: 'search',
              query: {
                q: this.search
              }
            })
          }
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
#search-podcasts {
  padding: 15px;
  margin-bottom: 15px;
}
</style>
