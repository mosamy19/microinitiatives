import * as types from "../../actions/types";
const initialState = {
  initiatives: {},
  singleInitiative: {},
  baseInitiative: {},
  myInitiatives: {},
  error: {},
};

const initiativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INITIATIVE:
      return {
        ...state,
        initiatives: action.payload.initiatives,
        error: {},
      };
    case types.SET_SINGLE_INITIATIVE:
      return {
        ...state,
        singleInitiative: action.payload.singleInitiative,
        error: {},
      };
    case types.SET_BASE_INITIATIVE:
      return {
        ...state,
        baseInitiative: action.payload.baseInitiative,
        error: {},
      };
    case types.SET_MY_INITIATIVE:
      return {
        ...state,
        myInitiatives: action.payload.myInitiatives,
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
