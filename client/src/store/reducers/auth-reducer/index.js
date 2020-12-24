import * as types from "../../actions/types";
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
  logedinUser: {},
  allUsers: {},
  error: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: Object.keys(action.payload.user).length !== 0,
        isAdmin: action.payload.user.isAdmin,
        error: {},
      };
    case types.SET_LOGEDIN_USER:
      return {
        ...state,
        logedinUser: action.payload.logedinUser,
        error: {},
      };
    case types.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
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
