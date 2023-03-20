import { createStore, combineReducers } from "redux";

import booksReducer from "./reducers/booksReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import themeReducer from "./reducers/themeReducer";

const rootReducer = combineReducers({
  bookState: booksReducer,
  categoriesState: categoriesReducer,
  themeState: themeReducer,
});

const store = createStore(rootReducer);

export default store;
