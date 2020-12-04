import axios from "axios";
import jwtDecode from "jwt-decode";
import * as types from "../types";
import setAuthToken from "../../../utils/setAuthToken";
import { setSuccess, setError } from "../snackbar-actions";

export const register = (user, history) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/signup", user);
    dispatch(setSuccess(response.data.message));
    history.push("/login");
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};
export const activateMyAccount = (token, history) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/activate-account", token);
    history.push("/login");
    console.log(response);
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const login = (userdata, history) => async (dispatch) => {
  try {
    let res = await axios.post("/api/v1/auth/login", userdata);

    let { token } = res.data;
    localStorage.setItem("auth_token", token);
    setAuthToken(token);
    // let decode = jwtDecode(token);
    let { user } = res.data;
    dispatch({
      type: types.SET_USER,
      payload: {
        user,
        success: res.data,
      },
    });
    history.push("/all-initiatives");
    dispatch(setSuccess(res.data.message));
  } catch (err) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: err.response.data,
      },
    });
    dispatch(setError(err.response.data));
  }
};

export const forgetPassword = (email, history) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/forget-password", email);
    dispatch(setSuccess(response.data.message));
    history.push("/reset-message");
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};
export const resetPassword = (newPassword, history) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/reset-password", newPassword);
    dispatch(setSuccess(response.data.message));
    history.push("/login");
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(error.response.data);
  }
};

export const changePassword = (passwords) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/change-password", passwords);
    dispatch(setSuccess(response.data.message));
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};
export const updateUser = (user) => async (dispatch) => {
  try {
    let response = await axios.put("/api/v1/auth/edit-user", user);
    dispatch({
      type: types.SET_USER,
      payload: {
        user: response.data,
      },
    });
    dispatch(setSuccess(response.data.message));
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
    dispatch(setError(error.response.data));
  }
};

export const getLoggedinUser = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/auth/get-loggedin-user");
    dispatch({
      type: types.SET_USER,
      payload: {
        user: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getPublicProfileUser = (userId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/auth/get-public-profile-user/${userId}`
    );
    dispatch({
      type: types.SET_USER,
      payload: {
        user: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const logout = (history) => {
  localStorage.removeItem("auth_token");
  history.push("/");
  return {
    type: types.SET_USER,
    payload: {
      user: {},
    },
  };
};
