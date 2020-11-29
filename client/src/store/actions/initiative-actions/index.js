import axios from "axios";
import * as types from "../types";
import { setSuccess, setError } from "../snackbar-actions";

export const getAllInitiatives = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/initiatives/get-initiatives");
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.INITIATIVES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};

export const getDraftInitiatives = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/initiatives/drafts");
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.INITIATIVES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};

export const getMyInitiatives = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/initiatives/my-initiatives");
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.INITIATIVES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};

export const getSingleInitiatives = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/initiatives/${initiativeId}`);
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
    console.log(response);
  } catch (error) {
    dispatch({
      type: types.INITIATIVES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};

export const createInitiative = (initiative) => async (dispatch) => {
  try {
    let response = await axios.post(
      "/api/v1/initiatives/create-initiatives",
      initiative
    );
    dispatch(setSuccess(response.data.message));
  } catch (error) {
    dispatch({
      type: types.INITIATIVES_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};
