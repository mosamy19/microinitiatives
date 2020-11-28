import axios from "axios";
import * as types from "../types";

export const getLikes = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `http://localhost:5000/api/v1/likes/get-likes/${initiativeId}`
    );
    dispatch({
      type: types.SET_LIKES,
      payload: {
        likes: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.LIKES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const createLike = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.post(
      `http://localhost:5000/api/v1/likes/like/${initiativeId}`
    );
  } catch (error) {
    dispatch({
      type: types.LIKES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const createUnlike = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `http://localhost:5000/api/v1/likes/unlike/${initiativeId}`
    );
  } catch (error) {
    dispatch({
      type: types.LIKES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
