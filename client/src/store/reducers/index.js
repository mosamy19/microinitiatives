import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import commentReducer from "./comment-reducer";
import favoriteReducer from "./favorite-reducer";
import initiativeReducer from "./initiative-reducer";
import likeReducer from "./likes-reducer";
import shareReducer from "./share-reducer";
import snackbarReducer from "./snackbar-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  initiatives: initiativeReducer,
  snackbar: snackbarReducer,
  likes: likeReducer,
  favorites: favoriteReducer,
  shares: shareReducer,
  comments: commentReducer,
});

export default rootReducer;
