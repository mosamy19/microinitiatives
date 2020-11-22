import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middlewere = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewere),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
