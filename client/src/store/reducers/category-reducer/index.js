import * as types from "../../actions/types";
const initialState = {
  categories: {},
  singleCategory: {},
  error: {},
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CATEGORY:
      return {
        ...state,
        categories: action.payload.categories,
        error: {},
      };
    case types.SET_SINGLE_CATEGORY:
      return {
        ...state,
        singleCategory: action.payload.singleCategory,
        error: {},
      };
    case types.CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default categoryReducer;
