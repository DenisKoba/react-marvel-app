import * as actionTypes from './actions';
import JSCookie from 'js-cookie'

const initialState = {
  characters: [],
  specificCharacter: [],
  token: null,
  refreshToken: null,
  emial: null,
  password: null,
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.GET_CHARACTERS:
      return {
        ...state,
        characters: action.data
      }
    case actionTypes.GET_CHOSEN_CHARACTER:
      return state
    case actionTypes.SIGN_UP:
      JSCookie.set('success', action.data.idToken)
      JSCookie.set('refreshToken', action.data.refreshToken)
      return {
        ...state,
        token: action.data.idToken,
        refreshToken: action.data.refreshToken,
      }
    case actionTypes.SIGN_IN:
      JSCookie.set('success', action.data.idToken)
      JSCookie.set('refreshToken', action.data.refreshToken)
      return {
        ...state,
        token: action.data.idToken,
        refreshToken: action.data.refreshToken,
      }
    default:
      return state;
  }

};

export default reducer;
