import googleApi from './google-api'

export default {
  signUp(props) {
    return googleApi.post('signupNewUser/', props)
  },
  signIn(props) {
    return googleApi.post('verifyPassword/', props)
  },
}
