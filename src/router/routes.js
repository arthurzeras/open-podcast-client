import { routes as register } from '../views/register'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import(
      /* webpackChunkName: "home" */
      '../views/Home'
    )
  },
  {
    name: 'about',
    path: '/about',
    component: () => import(
      /* webpackChunkName: "about" */
      '../views/About'
    )
  },
  ...register
]
