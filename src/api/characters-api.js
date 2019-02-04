import api from './api'

export default {
  getCharacters(props = {}) {
    return api.get('characters', props)
  },
  getCharDetails(id, props = {}) {
    return api.get(`characters/${id}`, props)
  },
  getCharComics(id, props = {}) {
    return api.get(`characters/${id}/comics`, props)
  },
  getComics(id, props = {}) {
    return api.get(`comics/${id}`, props)
  },
}
