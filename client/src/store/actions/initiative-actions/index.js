import axios from "axios";
import * as types from "../types";
import { setSuccess, setError } from "../snackbar-actions";

export const getAllInitiatives = () => async (dispatch) => {
  try {
    let response = await axios.get("http://localhost:5000/api/v1/initiatives");
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
    let response = await axios.get(
      `http://localhost:5000/api/v1/initiatives/${initiativeId}`
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

export const createInitiative = (initiative, history) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/api/v1/initiatives",
      initiative
    );
    dispatch(setSuccess(response.data.message));
    history.push("/all-initiatives");
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
