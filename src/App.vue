<template>
  <div id="app" :class="{'layout-padding': isLogged}">
    <layout-screen-loader/>
    <transition name="fade">
      <layout-navbar v-if="isLogged"/>
    </transition>
    <messages-notify/>

    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <transition name="fade">
      <layout-player v-if="isLogged"/>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  watch: {
    async isLogged () {
      this.$root.$emit('Spinner::show')
      await this.LoadPodcasts()
      this.$root.$emit('Spinner::hide')
    }
  },
  computed: {
    ...mapGetters('auth', ['isLogged'])
  },
  methods: {
    ...mapActions('podcasts', ['LoadPodcasts'])
  }
}
</script>

<style>
.layout-padding {
  padding-top: 70px;
  padding-bottom: 90px;
}
</style>
