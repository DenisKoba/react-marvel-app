import axios from 'axios/index'

const KEY = '?key=AIzaSyC3b4Rf_YWIhnbhtiDkxTsUJfhuOgj3oDw'
const BASE_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'


function defaultHandler(resp) {
  let data
  if (resp.data) {
    ({ data } = resp)
  }
  return data
}

export default {
  post(url, props) {
    return axios.post(`${BASE_URL}${url}${KEY}`, props).then(defaultHandler)
  },
}