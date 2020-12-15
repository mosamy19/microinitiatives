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
export const getLandingPageInitiatives = () => async (dispatch) => {
  try {
    let response = await axios.get(
      "/api/v1/initiatives/get-landing-page-initiatives"
    );
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
export const getPublicProfileInitiatives = (userId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/initiatives/get-public-profile-initiatives/${userId}`
    );
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

export const getClonedtInitiatives = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/initiatives/cloned-initiatives");
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
      type: types.SET_SINGLE_INITIATIVE,
      payload: {
        singleInitiative: response.data,
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
export const getBaseInitiative = (initiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/initiatives/${initiativeId}`);
    dispatch({
      type: types.SET_BASE_INITIATIVE,
      payload: {
        baseInitiative: response.data,
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
export const getLandingPageSingleInitiative = (initiativeId) => async (
  dispatch
) => {
  try {
    let response = await axios.get(
      `/api/v1/initiatives/get-landing-page-single-initiative/${initiativeId}`
    );
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

export const editMyInitiative = (id, initiative) => async (dispatch) => {
  try {
    let response = await axios.put(
      `/api/v1/initiatives/edit-initiative/${id}`,
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
