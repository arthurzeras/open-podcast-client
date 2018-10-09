import { isEmpty } from 'lodash'

export const isLogged = ({ user, token }) => !isEmpty(user) && !!token
