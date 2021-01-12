import axios from "axios";
import * as types from "../types";

export const createRule = (data) => async (dispatch) => {
  try {
    let response = await axios.post(`/api/v1/rules/create-rule`, data);
  } catch (error) {
    dispatch({
      type: types.RULE_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const editRule = (data) => async (dispatch) => {
  try {
    let response = await axios.put(`/api/v1/rules/edit-rule`, data);
  } catch (error) {
    dispatch({
      type: types.RULE_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const getRules = () => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/rules/get-rules`);
    dispatch({
      type: types.SET_RULE,
      payload: {
        rules: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.RULE_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getSingleRule = (ruleId) => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/rules/get-single-rule/${ruleId}`);
    dispatch({
      type: types.SET_SINGLE_RULE,
      payload: {
        singleRule: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.RULE_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const deleteRule = (ruleId) => async (dispatch) => {
  try {
    let response = await axios.delete(`/api/v1/rules/delete-rule/${ruleId}`);
  } catch (error) {
    dispatch({
      type: types.RULE_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
