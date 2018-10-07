<template>
  <div id="register" class="flex-center-column">
    <div class="logo flex-center-column">
      <i class="material-icons">mic</i>
      <h1>Open Podcast</h1>
    </div>
    <div class="content">
      <p>Cadastre-se para ter acesso</p>
      <form @submit.prevent="() => {}" class="form">
        <div class="form-group">
          <input
            autofocus
            type="text"
            placeholder="Nome"
            class="form-control form-control-lg"
          >
        </div>
        <div class="form-group">
          <input
            type="email"
            placeholder="E-mail"
            class="form-control form-control-lg"
          >
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Senha"
            class="form-control form-control-lg"
          >
        </div>
        <div class="form-group form-group-submit">
          <button class="btn btn-lg btn-main">
            Cadastrar-se
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

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
    .form {
      text-align: left;
      .form-group-submit {
        border-top: 1px solid $light;
        padding-top: 15px;
        text-align: center;
        .btn {
          padding-left: 50px;
          padding-right: 50px;
        }
      }
      .form-control {
        background: none;
        border-color: $main;
        color: $light;
        &::placeholder {
          color: $light;
          opacity: 1;
        }
      }
    }
  }
}
</style>
