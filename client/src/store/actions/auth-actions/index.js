import axios from "axios";
import jwtDecode from "jwt-decode";
import * as types from "../types";
import setAuthToken from "../../../utils/setAuthToken";
import { setSuccess, setError } from "../snackbar-actions";
import { hideLoading, showLoading } from "../loading-actions";

export const register = (obj, history) => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.post("/api/v1/auth/signup", obj);
    let { token } = response.data;
    localStorage.setItem("auth_token", token);
    setAuthToken(token);
    // let decode = jwtDecode(token);
    let { user } = response.data;
    dispatch({
      type: types.SET_USER,
      payload: {
        user,
      },
    });
    dispatch(hideLoading());
    dispatch(setSuccess(response.data.message));
    history.push("/confirm-email");
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
export const resetPassword = (payload, history) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/reset-password", payload);
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
      type: types.SET_LOGEDIN_USER,
      payload: {
        logedinUser: response.data,
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
    dispatch(showLoading());
    let response = await axios.get("/api/v1/auth/get-loggedin-user");
    dispatch({
      type: types.SET_LOGEDIN_USER,
      payload: {
        logedinUser: response.data,
      },
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

// admin routes actions
export const addNewUser = (user) => async (dispatch) => {
  try {
    let response = await axios.post("/api/v1/auth/add-new-user", user);
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

export const editUserByAdmin = (user, userId) => async (dispatch) => {
  try {
    let response = await axios.put(
      `/api/v1/auth/edit-user-by-admin/${userId}`,
      user
    );
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
export const deleteUserByAdmin = (userId) => async (dispatch) => {
  try {
    let response = await axios.delete(`/api/v1/auth/delete-user/${userId}`);
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

export const getUserChartDataDaily = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/auth/get-user-chart-data-daily");
    dispatch({
      type: types.USER_DAILY,
      payload: {
        dailyUsers: response.data,
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
export const getUserChartDataMonthly = () => async (dispatch) => {
  try {
    let response = await axios.get("/api/v1/auth/get-user-chart-data-monthly");
    dispatch({
      type: types.USER_MONTHLY,
      payload: {
        monthlyUsers: response.data,
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
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.get("/api/v1/auth/get-all-users");
    dispatch({
      type: types.SET_ALL_USERS,
      payload: {
        allUsers: response.data,
      },
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getSingleUser = (userId) => async (dispatch) => {
  try {
    dispatch(showLoading());
    let response = await axios.get(`/api/v1/auth/get-single-user/${userId}`);
    dispatch({
      type: types.SET_SINGLE_USER,
      payload: {
        singleUser: response.data,
      },
    });
    dispatch(hideLoading());
  } catch (error) {
    dispatch({
      type: types.USERS_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

//
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
