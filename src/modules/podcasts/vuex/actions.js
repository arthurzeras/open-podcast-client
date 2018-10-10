import services from '@/http'
import * as types from './mutation-types'

export const LoadPodcasts = ({ commit }) => (
  services.podcasts.loadPodcasts()
    .then(res => {
      commit(types.SET_PODCAST_LIST, res.data.podcasts)
    })
)

export const LoadEpisodes = ({ commit }, { id }) => {
  services.podcasts.loadEpisodes({ id })
    .then(res => {
      commit(types.SET_EPISODES_LIST, res.data.episodes)
    })
}
