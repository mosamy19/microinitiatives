import * as types from "../../actions/types";
const initialState = {
  notifications: {},
  error: {},
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NOTIFICATIONS:
      return {
        notifications: action.payload.notifications,
        error: {},
      };
    case types.NOTIFICATIONS_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default notificationReducer;
