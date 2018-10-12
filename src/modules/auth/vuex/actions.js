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
    return dispatch('LoadUserData')
  } catch (err) {
    return Promise.reject(err)
  }
}

export const LoadUserData = async ({ dispatch }) => {
  const { data } = await services.auth.userInfo()
  return dispatch('SetUser', data)
}

export const SetUser = ({ commit }, payload) => {
  commit(types.SET_USER_LOGGED, payload)
}

export const CheckToken = ({ dispatch, state }) => {
  if (state.token) {
    return Promise.resolve(state.token)
  }

  let token = storage.getStorageToken()

  if (!token) {
    return Promise.reject(new Error('Não existe token.'))
  }

  dispatch('SetToken', token)
  return dispatch('LoadUserData')
}

export const SetToken = ({ commit }, payload) => {
  return Promise.all([
    storage.setHeaderToken(payload),
    storage.setStorageToken(payload),
    commit(types.SET_SESSION_TOKEN, payload)
  ])
}

export const UnsetToken = ({ dispatch }) => {
  storage.deleteStorageToken()
  dispatch('SetToken', '')
  dispatch('SetUser', {})
}

export const Logout = ({ dispatch }) => {
  return Promise.all([
    dispatch('UnsetToken')
  ])
}
