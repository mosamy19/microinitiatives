import axios from "axios";
import { setError, setSuccess } from "../snackbar-actions";
import * as types from "../types";
export const getComments = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/comments/get-comments/${initiativeId}`
    );
    dispatch({
      type: types.SET_COMMENTS,
      payload: {
        comments: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const getLandingPageComments = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/comments/get-landing-page-comments/${initiativeId}`
    );
    dispatch({
      type: types.SET_COMMENTS,
      payload: {
        comments: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const makeComment = (initiativeId, comment) => async (dispatch) => {
  try {
    let response = await axios.post(
      `/api/v1/comments/add-comment/${initiativeId}`,
      comment
    );
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

// admin routes
export const getAllComments = () => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/comments/get-all-comments`);
    dispatch({
      type: types.SET_COMMENTS,
      payload: {
        comments: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getSingleComment = (commentId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/comments/get-single-comment/${commentId}`
    );
    dispatch({
      type: types.SET_SINGLE_COMMENT,
      payload: {
        singleComment: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const editComment = (commentId, data) => async (dispatch) => {
  try {
    let response = await axios.put(
      `/api/v1/comments/edit-comment/${commentId}`,
      data
    );
    dispatch(setSuccess(response.data.message));
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.data.message));
  }
};
export const deleteComment = (commentId) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `/api/v1/comments/delete-comment/${commentId}`
    );
    dispatch(setSuccess(response.data.message));
  } catch (error) {
    dispatch({
      type: types.COMMENTS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.data.message));
  }
};
