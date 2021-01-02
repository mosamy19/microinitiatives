import axios from "axios";
import { setError, setSuccess } from "../snackbar-actions";
import * as types from "../types";

export const receiveEmail = (data, history) => async (dispatch) => {
  try {
    let response = await axios.post(`/api/v1/email/receive-email`, data);
    history.push("/contact/message");
    dispatch(setSuccess(response.data.message));
  } catch (error) {
    dispatch({
      type: types.CONTACT_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.data.message));
  }
};
