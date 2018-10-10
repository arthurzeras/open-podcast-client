import { routes as home } from '../views/home'
import { routes as login } from '../views/login'
import { routes as episodes } from '../views/episodes'
import { routes as register } from '../views/register'

export default [
  ...home,
  ...login,
  ...episodes,
  ...register
]
