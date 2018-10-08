export default [
  {
    name: 'register',
    path: '/cadastro',
    meta: {
      withoutAuth: true,
      title: 'Cadastre-se'
    },
    component: () => import(
      /* webpackChunkName: "register" */
      './Register'
    )
  }
]
