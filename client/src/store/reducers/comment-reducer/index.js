import * as types from "../../actions/types";
const initialState = {
  comments: {},
  singleComment: {},
  error: {},
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
        error: {},
      };
    case types.SET_SINGLE_COMMENT:
      return {
        ...state,
        singleComment: action.payload.singleComment,
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
