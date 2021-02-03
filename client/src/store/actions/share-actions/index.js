import axios from "axios";
import * as types from "../types";

export const getAllShares = () => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/shares/get-all-shares`);
    dispatch({
      type: types.SET_SHARES,
      payload: {
        shares: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.SHARES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const getSharesDailyChartData = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/shares/get-shares-daily-chart-data`
    );
    dispatch({
      type: types.SHARE_DAILY,
      payload: {
        dailyShares: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.SHARES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getSharesMonthlyChartData = () => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/shares/get-shares-monthly-chart-data`
    );
    dispatch({
      type: types.SHARE_MONTHLY,
      payload: {
        monthlyShares: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.SHARES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getShares = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/shares/get-shares/${initiativeId}`);
    dispatch({
      type: types.SET_SHARES,
      payload: {
        shares: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.SHARES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const makeShare = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.post(`/api/v1/shares/${initiativeId}`);
  } catch (error) {
    dispatch({
      type: types.SHARES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
