<template>
  <div id="app">
    <layout-screen-loader/>
    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <layout-navbar v-if="isLogged"/>
    </transition>
    <messages-notify/>

    <transition
      mode="out-in"
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <router-view/>
    </transition>

    <transition
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <layout-player v-if="isLogged"/>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutNavbar from './components/layout/LayoutNavbar'
import LayoutPlayer from './components/layout/LayoutPlayer'
import MessagesNotify from './modules/notify/MessagesNotify'
import LayoutScreenLoader from './components/layout/LayoutScreenLoader'

export default {
  components: {
    LayoutNavbar,
    LayoutPlayer,
    MessagesNotify,
    LayoutScreenLoader
  },
  computed: {
    ...mapGetters('auth', ['isLogged'])
  }
}
</script>
