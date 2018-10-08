export default [
  {
    name: 'login',
    path: '/login',
    meta: {
      title: 'Entrar',
      withoutAuth: true
    },
    component: () => import(
      /* webpackChunkName: "login" */
      './Login'
    )
  }
]
