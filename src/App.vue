<template>
  <div id="app">
    <router-view/>
    <layout-player v-if="loggedIn"/>
  </div>
</template>

<script>
import LayoutPlayer from './components/layout/LayoutPlayer'

export default {
  components: {
    LayoutPlayer
  },
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>
