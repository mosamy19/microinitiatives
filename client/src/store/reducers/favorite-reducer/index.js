import * as types from "../../actions/types";
const initialState = {
  favorites: {},
  error: {},
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_FAVORITES:
      return {
        favorites: action.payload.favorites,
        error: {},
      };
    case types.FAVORITES_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default favoriteReducer;
