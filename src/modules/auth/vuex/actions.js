import services from '@/http'
import * as storage from '../storage'
import * as types from './mutation-types'

export const RegisterUser = ({ dispatch }, payload) => {
  return services.auth.registerUser(payload)
    .then(() => {
      delete (payload.name)
      return dispatch('Login', payload)
    })
}

export const Login = async ({ dispatch }, payload) => {
  try {
    const res = await services.auth.login(payload)
    await dispatch('SetToken', res.data.token)

    const { data } = await services.auth.userInfo()
    return dispatch('SetUser', data)
  } catch (err) {
    return err
  }
}

export const SetUser = ({ commit }, payload) => {
  commit(types.SET_USER_LOGGED, payload)
}

export const SetToken = ({ commit }, payload) => {
  return Promise.all([
    storage.setHeaderToken(payload),
    storage.setStorageToken(payload),
    commit(types.SET_SESSION_TOKEN, payload)
  ])
}
