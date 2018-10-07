<template>
  <div id="app">
    <messages-notify/>
    <router-view/>
    <layout-player v-if="loggedIn"/>
  </div>
</template>

<script>
import LayoutPlayer from './components/layout/LayoutPlayer'
import MessagesNotify from './modules/notify/MessagesNotify'

export default {
  components: {
    LayoutPlayer,
    MessagesNotify
  },
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>
