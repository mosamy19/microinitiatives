import * as types from "../../actions/types";
const initialState = {
  error: {},
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CONTACT_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default contactReducer;
