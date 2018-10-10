import * as types from './mutation-types'

export default {
  [types.SET_PODCAST_LIST] (state, payload) {
    state.podcastList = payload
  }
}
