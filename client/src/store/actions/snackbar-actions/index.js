import * as types from "../types";
export const setError = (error) => {
  return {
    type: types.SET_ERROR,
    error: error,
  };
};

export const setSuccess = (message) => {
  return {
    type: types.SET_SUCCESS,
    message: message,
  };
};

export const closeSnackbar = () => {
  return {
    type: types.CLOSE_SNACKBAR,
  };
};