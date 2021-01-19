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
export const showDraftLoading = () => {
  return {
    type: types.SHOW_DRAFT_LOADING,
  };
};
export const hideDraftLoading = () => {
  return {
    type: types.HIDE_DRAFT_LOADING,
  };
};
export const showCreateLoading = () => {
  return {
    type: types.SHOW_CREATE_LOADING,
  };
};
export const hideCreateLoading = () => {
  return {
    type: types.HIDE_CREATE_LOADING,
  };
};
