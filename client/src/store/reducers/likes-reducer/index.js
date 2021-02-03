import * as types from "../../actions/types";
const initialState = {
  likes: {},
  dailyLikes: {},
  monthlyLikes: {},
  error: {},
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LIKES:
      return {
        likes: action.payload.likes,
        error: {},
      };
    case types.LIKE_DAILY:
      return {
        dailyLikes: action.payload.dailyLikes,
        error: {},
      };
    case types.LIKE_MONTHLY:
      return {
        monthlyLikes: action.payload.monthlyLikes,
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
