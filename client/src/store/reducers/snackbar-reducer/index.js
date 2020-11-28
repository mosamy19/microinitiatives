import * as types from "../../actions/types";
const initialState = {
  isOpen: false,
  message: null,
  severity: null,
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ERROR:
      return {
        ...state,
        isOpen: true,
        message: action.error.message,
        severity: "error",
      };
    case types.SET_SUCCESS:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        severity: "success",
      };
    case types.CLOSE_SNACKBAR:
      return {
        ...state,
        isOpen: false,
      };
    default:
      return state;
  }
};

export default snackbarReducer;
