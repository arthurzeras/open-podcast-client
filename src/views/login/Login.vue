<template>
  <div id="login" class="flex-center-column">
    <div class="logo flex-center-column">
      <i class="material-icons">mic</i>
      <h1>Open Podcast</h1>
    </div>
    <p>Bem vindo ao open podcast, para continuar digite suas informações de login</p>
    <div class="login-box">
      <form @submit.prevent="submit()" class="form-authentication">
        <div class="form-group">
          <input
            required
            autofocus
            type="email"
            v-model="form.email"
            placeholder="E-mail"
            class="form-control form-control-lg"
          >
        </div>
        <div class="form-group">
          <input
            required
            type="password"
            placeholder="Senha"
            v-model="form.password"
            class="form-control form-control-lg"
          >
        </div>
        <div class="form-group form-group-submit flex-center">
          <base-button-loader
            label="Entrar"
            :loading="loading"
            label-loading="Entrando..."
          />
        </div>
        <div class="text-center">
          <router-link :to="{ name: 'register' }">
            Não sou cadastrado
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['Login']),
    async submit () {
      this.loading = true
      try {
        await this.Login(this.form)
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$root.$emit('Notify::show', {
          type: 'danger',
          message: err.data
            ? err.data.message
            : 'Não foi possível entrar no momento'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

#login {
  height: 100vh;
  width: 100%;
  .logo {
    color: $main;
    i {
      font-size: 20pt;
    }
    h1 {
      font-size: 18pt;
    }
  }
  .login-box {
    width: 25%;
  }
}
</style>
