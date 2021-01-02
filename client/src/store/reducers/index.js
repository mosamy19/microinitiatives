import { combineReducers } from "redux";
import authReducer from "./auth-reducer";
import categoryReducer from "./category-reducer";
import commentReducer from "./comment-reducer";
import contactReducer from "./contactus-reducer";
import favoriteReducer from "./favorite-reducer";
import initiativeReducer from "./initiative-reducer";
import likeReducer from "./likes-reducer";
import loaderReducer from "./loading-reducer";
import lottieReducer from "./lottie-reducer";
import notificationReducer from "./notification-reducer";
import shareReducer from "./share-reducer";
import snackbarReducer from "./snackbar-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  initiatives: initiativeReducer,
  loader: loaderReducer,
  snackbar: snackbarReducer,
  likes: likeReducer,
  favorites: favoriteReducer,
  shares: shareReducer,
  comments: commentReducer,
  notifications: notificationReducer,
  category: categoryReducer,
  lottie: lottieReducer,
  contact: contactReducer,
});

export default rootReducer;
