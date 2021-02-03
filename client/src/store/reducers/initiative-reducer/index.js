import * as types from "../../actions/types";
const initialState = {
  initiatives: {},
  singleInitiative: {},
  clonedInitiatives: {},
  baseInitiative: {},
  myInitiatives: {},
  dailyInitiatives: {},
  monthlyInitiatives: {},
  dailyClonedInitiatives: {},
  monthlyClonedInitiatives: {},
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
    case types.SET_CLONED_INITIATIVES:
      return {
        ...state,
        clonedInitiatives: action.payload.clonedInitiatives,
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
    case types.INITIATIVE_DAILY:
      return {
        ...state,
        dailyInitiatives: action.payload.dailyInitiatives,
        error: {},
      };
    case types.INITIATIVE_MONTHLY:
      return {
        ...state,
        monthlyInitiatives: action.payload.monthlyInitiatives,
        error: {},
      };
    case types.CLONED_INITIATIVE_DAILY:
      return {
        ...state,
        dailyClonedInitiatives: action.payload.dailyClonedInitiatives,
        error: {},
      };
    case types.CLONED_INITIATIVE_MONTHLY:
      return {
        ...state,
        monthlyClonedInitiatives: action.payload.monthlyClonedInitiatives,
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
