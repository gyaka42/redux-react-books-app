const actionTypes = {
  bookActions: {
    GET_BOOKS_START: "GET_BOOKS_START",
    GET_BOOKS_SUCCESS: "GET_BOOKS_SUCCESS",
    GET_BOOKS_FAIL: "GET_BOOKS_FAIL",
    ADD_BOOK: "ADD_BOOK",
    DELETE_BOOK: "DELETE_BOOK",
    EDIT_BOOK: "EDIT_BOOK",
    DELETE_BOOKS_CATEGORY: "DELETE_BOOKS_CATEGORY",
  },
  categoryActions: {
    GET_CATEGORIES_START: "GET_CATEGORIES_START",
    GET_CATEGORIES_SUCCESS: "GET_CATEGORIES_SUCCESS",
    GET_CATEGORIES_FAIL: "GET_CATEGORIES_FAIL",
    ADD_CATEGORY: "ADD_CATEGORY",
    DELETE_CATEGORY: "DELETE_CATEGORY",
  },
  themeActions: {
    CHANGE_THEME: "CHANGE_THEME",
  },
};

export default actionTypes;
