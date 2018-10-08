import { routes as login } from '../views/login'
import { routes as register } from '../views/register'

export default [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home'
    },
    component: () => import(
      /* webpackChunkName: "home" */
      '../views/Home'
    )
  },
  ...login,
  ...register
]
