import * as actionTypes from './actions';




const initialState = {
  characters: [],
  specificCharacter: [],
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
    default:
      return state;
  }

};

export default reducer;
