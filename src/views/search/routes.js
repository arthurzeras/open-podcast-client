export default [
  {
    path: '/busca',
    name: 'search',
    meta: {
      title: 'Busca'
    },
    component: () => import(
      /* webpackChunkName: "search-page" */
      './components/Search'
    )
  }
]
