import * as types from "../../actions/types";
const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {},
  logedinUser: {},
  singleUser: {},
  allUsers: {},
  dailyUsers: {},
  monthlyUsers: {},
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
    case types.SET_SINGLE_USER:
      return {
        ...state,
        singleUser: action.payload.singleUser,
        error: {},
      };
    case types.SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
        error: {},
      };
    case types.USER_DAILY:
      return {
        ...state,
        dailyUsers: action.payload.dailyUsers,
        error: {},
      };
    case types.USER_MONTHLY:
      return {
        ...state,
        monthlyUsers: action.payload.monthlyUsers,
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
