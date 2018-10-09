<template>
  <div id="app">
    <messages-notify/>

    <transition
      mode="out-in"
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <router-view/>
    </transition>
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
