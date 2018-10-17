import services from '@/http'
import * as types from './mutation-types'

export const LoadPodcasts = ({ commit }) => (
  services.podcasts.loadPodcasts()
    .then(res => {
      commit(types.SET_PODCAST_LIST, res.data.podcasts)
    })
)

export const LoadEpisodes = ({ commit }, payload) => {
  commit(types.SET_CURRENT_PAGE, payload.page || 1)

  return services.podcasts.loadEpisodes(payload)
    .then(res => {
      commit(types.SET_LAST_PAGE, res.data.total_pages)
      commit(types.SET_EPISODES_LIST, res.data.episodes)
    })
}

export const ResetEpisodesList = ({ commit }) => {
  commit(types.UNSET_EPISODES_LIST)
  commit(types.SET_CURRENT_PAGE, 1)
  commit(types.SET_LAST_PAGE, null)
}
