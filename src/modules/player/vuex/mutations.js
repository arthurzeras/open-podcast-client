import * as types from './mutation-types'

export default {
  [types.SET_PODCAST_PLAYING] (state, payload) {
    state.playing = payload
  }
}
