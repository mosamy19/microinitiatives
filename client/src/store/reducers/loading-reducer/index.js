import * as types from "../../actions/types";
const initialState = {
  isLoading: false,
  draftLoading: false,
  createLoading: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case types.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case types.SHOW_DRAFT_LOADING:
      return {
        ...state,
        draftLoading: true,
      };
    case types.HIDE_DRAFT_LOADING:
      return {
        ...state,
        draftLoading: false,
      };
    case types.SHOW_CREATE_LOADING:
      return {
        ...state,
        createLoading: true,
      };
    case types.HIDE_CREATE_LOADING:
      return {
        ...state,
        createLoading: false,
      };
    default:
      return state;
  }
};

export default loaderReducer;
