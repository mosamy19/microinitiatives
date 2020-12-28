import axios from "axios";
import * as types from "../types";
import { setSuccess, setError } from "../snackbar-actions";
import { hideLoading, showLoading } from "../loading-actions";

// Admin routes
export const getAllInitiativesByAdmin = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.get(
      "/api/v1/initiatives/get-admin-panel-initiatives"
    );
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
    dispatch(hideLoading());
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

export const editInitiativeByAdmin = (id, initiative) => async (dispatch) => {
  try {
    let response = await axios.put(
      `/api/v1/initiatives/edit-initiative-by-admin/${id}`,
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

export const deleteInitiativeByAdmin = (id) => async (dispatch) => {
  try {
    let response = await axios.delete(`/api/v1/initiatives/delete/${id}`);
    // history.push(`/single-initiative/${id}`);
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

// Auth routes
export const getAllInitiatives = (value) => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.get(
      `/api/v1/initiatives/get-initiatives/${value}`
    );
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
    dispatch(hideLoading());
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
export const getLandingPageInitiatives = (value) => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.get(
      `/api/v1/initiatives/get-landing-page-initiatives/${value}`
    );
    dispatch({
      type: types.SET_INITIATIVE,
      payload: {
        initiatives: response.data,
      },
    });
    dispatch(hideLoading());
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

export const getClonedtInitiatives = (baseInitiativeId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/initiatives/cloned-initiatives/${baseInitiativeId}`
    );
    dispatch({
      type: types.SET_CLONED_INITIATIVES,
      payload: {
        clonedInitiatives: response.data,
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
    dispatch(showLoading());
    let response = await axios.get("/api/v1/initiatives/my-initiatives");
    dispatch({
      type: types.SET_MY_INITIATIVE,
      payload: {
        myInitiatives: response.data,
      },
    });
    dispatch(hideLoading());
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
    dispatch(showLoading());
    let response = await axios.get(`/api/v1/initiatives/${initiativeId}`);
    dispatch({
      type: types.SET_SINGLE_INITIATIVE,
      payload: {
        singleInitiative: response.data,
      },
    });
    dispatch(hideLoading());
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
    dispatch(showLoading());
    let response = await axios.get(
      `/api/v1/initiatives/get-landing-page-single-initiative/${initiativeId}`
    );
    dispatch({
      type: types.SET_SINGLE_INITIATIVE,
      payload: {
        singleInitiative: response.data,
      },
    });
    dispatch(hideLoading());
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
export const getLandingPageBaseInitiative = (initiativeId) => async (
  dispatch
) => {
  try {
    let response = await axios.get(
      `/api/v1/initiatives/get-landing-page-single-initiative/${initiativeId}`
    );
    dispatch({
      type: types.SET_BASE_INITIATIVE,
      payload: {
        baseInitiative: response.data,
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
export const getLandingPageClonedInitiative = (baseInitiativeId) => async (
  dispatch
) => {
  try {
    let response = await axios.get(
      `/api/v1/initiatives/get-landing-page-cloned-initiative/${baseInitiativeId}`
    );
    dispatch({
      type: types.SET_CLONED_INITIATIVES,
      payload: {
        clonedInitiatives: response.data,
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

export const createInitiative = (initiative, history) => async (dispatch) => {
  try {
    let response = await axios.post(
      "/api/v1/initiatives/create-initiatives",
      initiative
    );
    if (response.data.draft === true) {
      history.push("/my-initiatives");
    } else {
      setTimeout(() => {
        history.push(`/single-initiative/${response.data._id}`);
      }, 2800);
    }
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

export const editMyInitiative = (id, initiative, history) => async (
  dispatch
) => {
  try {
    let response = await axios.put(
      `/api/v1/initiatives/edit-initiative/${id}`,
      initiative
    );
    history.push(`/single-initiative/${id}`);
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
