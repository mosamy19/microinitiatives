import * as types from "../../actions/types";
const initialState = {
  rules: {},
  singleRule: {},
  error: {},
};

const ruleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RULE:
      return {
        ...state,
        rules: action.payload.rules,
        error: {},
      };
    case types.SET_SINGLE_RULE:
      return {
        ...state,
        singleRule: action.payload.singleRule,
        error: {},
      };
    case types.RULE_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default ruleReducer;
