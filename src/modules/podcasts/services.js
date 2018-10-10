export default {
  loadPodcasts: { method: 'get', url: 'podcast' },
  loadEpisodes: { method: 'get', url: 'podcast{/id}' }
}
