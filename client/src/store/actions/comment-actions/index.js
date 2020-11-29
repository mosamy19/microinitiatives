import axios from "axios";
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
