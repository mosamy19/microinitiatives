import * as types from "../../actions/types";
const initialState = {
  isAuthenticated: false,
  user: {},
  success: {},
  error: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        user: action.payload.user,
        success: action.payload.success,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        error: {},
      };
    case types.USERS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
