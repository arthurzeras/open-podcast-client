import services from '@/http'
import * as types from './mutation-types'

export const LoadPodcasts = ({ commit }) => (
  services.podcasts.loadPodcasts()
    .then(res => {
      commit(types.SET_PODCAST_LIST, res.data.podcasts)
    })
)
