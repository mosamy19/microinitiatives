import axios from "axios";
import * as types from "../types";

export const getLikes = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/likes/get-likes/${initiativeId}`);
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
export const getAllLikes = () => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/likes/get-all-likes`);
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
export const getLikesDailyChartData = () => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/likes/get-likes-daily-chart-data`);
    dispatch({
      type: types.LIKE_DAILY,
      payload: {
        dailyLikes: response.data,
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

export const getLikesMonthlyChartData = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/likes/get-likes-monthly-chart-data`
    );
    dispatch({
      type: types.LIKE_MONTHLY,
      payload: {
        monthlyLikes: response.data,
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
    let response = await axios.post(`/api/v1/likes/like/${initiativeId}`);
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
    let response = await axios.delete(`/api/v1/likes/unlike/${initiativeId}`);
  } catch (error) {
    dispatch({
      type: types.LIKES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
