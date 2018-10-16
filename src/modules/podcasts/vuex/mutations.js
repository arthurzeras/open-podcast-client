import * as types from './mutation-types'

export default {
  [types.SET_LAST_PAGE] (state, payload) {
    state.lastPage = payload
  },
  [types.SET_CURRENT_PAGE] (state, payload) {
    state.currentPage = payload
  },
  [types.SET_PODCAST_LIST] (state, payload) {
    state.podcastList = payload
  },
  [types.SET_EPISODES_LIST] (state, payload) {
    state.episodesList = [...state.episodesList, ...payload]
  },
  [types.UNSET_EPISODES_LIST] (state) {
    state.episodesList = []
  }
}
