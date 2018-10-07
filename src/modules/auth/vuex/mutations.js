import * as types from './mutation-types'

export default {
  [types.SET_USER_LOGGED] (state, user) {
    state.user = user
  },
  [types.SET_SESSION_TOKEN] (state, token) {
    state.token = token
  }
}
