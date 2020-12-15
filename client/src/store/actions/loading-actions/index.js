import * as types from "../types";

export const showLoading = () => {
  return {
    type: types.SHOW_LOADING,
  };
};
export const hideLoading = () => {
  return {
    type: types.HIDE_LOADING,
  };
};
