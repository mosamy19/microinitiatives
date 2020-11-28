import * as types from "../../actions/types";
const initialState = {
  shares: {},
  error: {},
};

const shareReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SHARES:
      return {
        shares: action.payload.shares,
        error: {},
      };
    case types.SHARES_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default shareReducer;
