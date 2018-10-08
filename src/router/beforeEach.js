import store from '../vuex'

export default (to, from, next) => {
  document.title = `${to.meta.title} • Open Podcast`

  if (to.meta.withoutAuth) {
    next()
  } else {
    store.dispatch('auth/CheckToken')
      .then(() => {
        next()
      })
      .catch(() => {
        next({ name: 'login' })
      })
  }
}
