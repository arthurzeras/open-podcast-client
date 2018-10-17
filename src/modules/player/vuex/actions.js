import * as types from './mutation-types'

export const SetEpisodePlaying = ({ commit }, payload) => {
  commit(types.SET_PODCAST_PLAYING, payload)
}
