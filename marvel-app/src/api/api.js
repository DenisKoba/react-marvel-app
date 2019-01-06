import axios from 'axios/index'

const KEY = 'ee36a79dfdfc1141f1ea1a48d75f9d39'
const BASE_URL = 'https://gateway.marvel.com/v1/public/'


function defaultHandler(resp) {
  let data
  if (resp.data) {
    ({ data } = resp)
  }
  return data
}

export default {
  get(url) {
    return axios.get(`${BASE_URL}${url}?limit=50&apikey=${KEY}`).then(defaultHandler)
  },
}