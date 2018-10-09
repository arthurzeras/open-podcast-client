<template>
  <div id="register" class="flex-center-column">
    <div class="logo flex-center-column">
      <i class="material-icons">mic</i>
      <h1>Open Podcast</h1>
    </div>
    <div class="content">
      <p>Cadastre-se para ter acesso</p>
      <form @submit.prevent="submit()" class="form-authentication">
        <div class="form-group">
          <input
            required
            autofocus
            type="text"
            placeholder="Nome"
            v-model="form.name"
            class="form-control form-control-lg"
          >
        </div>
        <div class="form-group">
          <input
            required
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
        <div class="form-group form-group-submit">
          <button class="btn btn-lg btn-main" :disabled="invalidForm">
            Cadastrar-se
          </button>
        </div>

        <div class="text-center">
          <router-link :to="{ name: 'login' }">
            Já sou cadastrado
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      form: {
        name: 'Arthur Oliveira',
        email: 'arthurolvmorais@gmail.com',
        password: '123321'
      }
    }
  },
  computed: {
    invalidForm () {
      const { name, email, password } = this.form
      return !name || !email || !password
    }
  },
  methods: {
    ...mapActions('auth', ['RegisterUser']),
    async submit () {
      try {
        await this.RegisterUser(this.form)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.error(err)
        this.$root.$emit('Notify::show', {
          type: 'danger',
          message: err.data
            ? err.data.error
            : 'Não foi possível fazer o cadastro'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables';

#register {
  padding: 15px;
  .logo {
    width: 100%;
    color: $main;
    border-bottom: 1px solid $lighter;
    .material-icons {
      font-size: 25pt;
      font-weight: bold;
    }
    h1 {
      font-weight: bold;
      font-size: 25pt;
    }
  }

  .content {
    width: 50%;
    padding-top: 20px;
    p {
      font-size: 18pt;
      text-align: center;
    }
  }
}
</style>
