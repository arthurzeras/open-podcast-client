export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: () => import(
      /* webpackChunkName: "home" */
      './Home'
    )
  }
]
