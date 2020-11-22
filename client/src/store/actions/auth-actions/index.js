import axios from "axios";
import jwtDecode from "jwt-decode";
import * as types from "../types";
import setAuthToken from "../../../utils/setAuthToken";

export const register = (user, history) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/api/v1/auth/signup",
      user
    );
    // dispatch({
    //   type: types.SET_USER,
    //   payload: {
    //     success: response.data,
    //     error: {},
    //   },
    // });
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const activateMyAccount = (token, history) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/api/v1/auth/activate-account",
      token
    );
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

export const login = (user, history) => async (dispatch) => {
  try {
    let res = await axios.post("http://localhost:5000/api/v1/auth/login", user);
    let { token } = res.data;
    localStorage.setItem("auth_token", token);
    setAuthToken(token);
    let decode = jwtDecode(token);
    dispatch({
      type: types.SET_USER,
      payload: {
        user: decode,
        success: res.data,
      },
    });
    history.push("/all-initiatives");
    console.log(res);
  } catch (err) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: err.response.data,
      },
    });
  }
};

export const forgetPassword = (email, history) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/api/v1/auth//forget-password",
      email
    );
    console.log(response);
    history.push("/reset-message");
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const resetPassword = (newPassword, history) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/api/v1/auth//reset-password",
      newPassword
    );
    console.log(response);
    history.push("/login");
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const changePassword = (passwords) => async (dispatch) => {
  try {
    let response = await axios.post(
      "http://localhost:5000/api/v1/auth/change-password",
      passwords
    );
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

export const logout = (history) => {
  localStorage.removeItem("auth_token");
  history.push("/login");
  return {
    type: types.SET_USER,
    payload: {
      user: {},
    },
  };
};
