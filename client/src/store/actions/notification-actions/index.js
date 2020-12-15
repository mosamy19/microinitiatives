import axios from "axios";
import { hideLoading, showLoading } from "../loading-actions";
import * as types from "../types";

export const getNotifications = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.get(`/api/v1/notifications/get-notifications`);
    dispatch({
      type: types.SET_NOTIFICATIONS,
      payload: {
        notifications: response.data,
      },
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch({
      type: types.NOTIFICATIONS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const makeIsCheckedTrue = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/notifications/get-notifications/is-checked`
    );
    dispatch({
      type: types.SET_NOTIFICATIONS,
      payload: {
        notifications: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.NOTIFICATIONS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
