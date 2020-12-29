import * as types from "../../actions/types";
const initialState = {
  isOpen: false,
};

const lottieReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOTTIE_OPEN:
      return {
        ...state,
        isOpen: true,
      };
    case types.SET_LOTTIE_CLOSE:
      return {
        ...state,
        isOpen: false,
      };

    default:
      return state;
  }
};

export default lottieReducer;
