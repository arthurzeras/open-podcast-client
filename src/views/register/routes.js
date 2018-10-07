export default [
  {
    name: 'cadastro',
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
