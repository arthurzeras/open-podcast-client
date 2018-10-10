export default [
  {
    path: '/podcast/:id',
    name: 'episodes-list',
    meta: {
      title: 'Episódio'
    },
    component: () => import(
      /* webpackChunkName: "podcast-page" */
      './PodcastPage'
    )
  }
]
