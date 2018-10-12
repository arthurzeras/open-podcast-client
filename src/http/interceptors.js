import store from '../vuex'
import router from '../router'

export default req => {
  return res => {
    if (res.status === 401 && !!store.state.auth.token) {
      store.dispatch('notify/SetMessage', {
        type: 'danger',
        message: `Ocorreu algum problema com o token
          da sua sessão, por favor entre novamente`
      })

      store.dispatch('auth/UnsetToken')
      router.push({ name: 'login' })
    }
  }
}
