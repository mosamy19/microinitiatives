import axios from "axios";
import * as types from "../types";

export const getFavorites = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/favorites/get-favorites/${initiativeId}`
    );
    dispatch({
      type: types.SET_FAVORITES,
      payload: {
        favorites: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.FAVORITES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const makeFavorite = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.post(
      `/api/v1/favorites/favorite/${initiativeId}`
    );
  } catch (error) {
    dispatch({
      type: types.FAVORITES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const setUnfavorite = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `/api/v1/favorites/unfavorite/${initiativeId}`
    );
  } catch (error) {
    dispatch({
      type: types.FAVORITES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
