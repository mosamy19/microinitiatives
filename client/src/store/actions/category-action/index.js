import axios from "axios";
import * as types from "../types";

export const createCategory = (data) => async (dispatch) => {
  try {
    let response = await axios.post(`/api/v1/categories/create-category`, data);
  } catch (error) {
    dispatch({
      type: types.CATEGORY_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const editCategoryByAdmin = (data) => async (dispatch) => {
  try {
    let response = await axios.put(`/api/v1/categories/edit-category`, data);
  } catch (error) {
    dispatch({
      type: types.CATEGORY_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    let response = await axios.get(`/api/v1/categories/get-all-categories`);
    dispatch({
      type: types.SET_CATEGORY,
      payload: {
        categories: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.CATEGORY_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
export const getSingleCategory = (categoryId) => async (dispatch) => {
  try {
    let response = await axios.get(
      `/api/v1/categories/get-single-category/${categoryId}`
    );
    dispatch({
      type: types.SET_SINGLE_CATEGORY,
      payload: {
        singleCategory: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: types.CATEGORY_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};

export const deleteCategoryByAdmin = (categoryId) => async (dispatch) => {
  try {
    let response = await axios.delete(
      `/api/v1/categories/delete-category/${categoryId}`
    );
  } catch (error) {
    dispatch({
      type: types.CATEGORY_ERROR,
      payload: {
        error: error.response.data,
      },
    });
  }
};
