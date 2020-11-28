import * as types from "../../actions/types";
const initialState = {
  likes: {},
  error: {},
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIKES:
      return {
        likes: action.payload.likes,
        error: {},
      };
    case types.LIKES_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default likeReducer;
