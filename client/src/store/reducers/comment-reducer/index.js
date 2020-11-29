import * as types from "../../actions/types";
const initialState = {
  comments: {},
  error: {},
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_COMMENTS:
      return {
        comments: action.payload.comments,
        error: {},
      };
    case types.COMMENTS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default commentReducer;
