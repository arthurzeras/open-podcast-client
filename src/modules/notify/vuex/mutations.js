import * as types from './mutation-types'

export default {
  [types.SET_NOTIFY_MESSAGE] (state, message) {
    state.messages.push(message)
  },
  [types.REMOVE_NOTIFY_MESSAGE] (state, index) {
    if (index) {
      state.messages.shift()
    } else {
      state.messages.splice(index, 1)
    }
  }
}
