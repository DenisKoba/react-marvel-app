import api from './api'

export default {
  getCharacters() {
    return api.get('characters')
  },
}