import axios from "axios";
import * as types from "../types";

export const getShares = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `http://localhost:5000/api/v1/shares/get-shares/${initiativeId}`
    );
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
    let response = await axios.post(
      `http://localhost:5000/api/v1/shares/${initiativeId}`
    );
  } catch (error) {
    dispatch({
      type: types.SHARES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
