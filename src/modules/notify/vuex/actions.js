import * as types from './mutation-types'

export const SetMessage = ({ commit, dispatch, state }, payload) => {
  const hasSameMessage = state.messages.filter(m => (
    m.message === payload.message
  ))

  if (!hasSameMessage.length) {
    commit(types.SET_NOTIFY_MESSAGE, payload)
    setTimeout(() => {
      dispatch('RemoveMessage')
    }, payload.timeout || 5000)
  }
}

export const RemoveMessage = ({ commit }, index = null) => {
  commit(types.REMOVE_NOTIFY_MESSAGE, index)
}
