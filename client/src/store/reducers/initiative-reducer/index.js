import * as types from "../../actions/types";
const initialState = {
  initiatives: {},
  error: {},
};

const initiativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INITIATIVE:
      return {
        initiatives: action.payload.initiatives,
        error: {},
      };
    case types.INITIATIVES_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default initiativeReducer;
