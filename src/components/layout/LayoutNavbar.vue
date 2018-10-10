<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{ name: 'home' }" class="navbar-brand flex-center text-main">
      <i class="material-icons">mic</i>
      Open Podcast
    </router-link>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
      <div class="ml-auto">
        <span>OLÁ, {{ userFirstName }}</span> |
        <button @click="logoutUser()" class="btn btn-pure-light">
          <i class="material-icons">power_settings_new</i>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user']),
    userFirstName () {
      return this.user.name.split(' ')[0].toUpperCase()
    }
  },
  methods: {
    ...mapActions('auth', ['Logout']),
    logoutUser () {
      this.$root.$emit('Spinner::show')

      setTimeout(() => {
        this.Logout().then(() => {
          this.$root.$emit('Spinner::hide')
          this.$router.push({ name: 'login' })
        })
      }, 500)
    }
  }
}
</script>
