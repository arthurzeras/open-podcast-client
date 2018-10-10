import * as types from './mutation-types'

export default {
  [types.SET_PODCAST_LIST] (state, payload) {
    state.podcastList = payload
  },
  [types.SET_EPISODES_LIST] (state, payload) {
    state.episodesList = payload
  }
}
