import { createStore, combineReducers } from "redux";

import booksReducer from "./reducers/booksReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import themeReducer from "./reducers/themeReducer";
import loginReducer from "./reducers/loginReducer";

const rootReducer = combineReducers({
  bookState: booksReducer,
  categoriesState: categoriesReducer,
  themeState: themeReducer,
  loginState: loginReducer,
});

const store = createStore(rootReducer);

export default store;
