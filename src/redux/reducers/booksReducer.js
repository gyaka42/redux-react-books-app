import actionTypes from "../actions/actionTypes";

const initialState = {
  pending: true,
  success: false,
  books: [],
  error: false,
  errorMessage: "",
};

export const deleteBook = (bookId) => ({
  type: actionTypes.bookActions.DELETE_BOOK,
  payload: bookId,
});

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.bookActions.GET_BOOKS_START:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.bookActions.GET_BOOKS_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
        books: action.payload,
      };
    case actionTypes.bookActions.GET_BOOKS_FAIL:
      return {
        ...state,
        pending: false,
        success: false,
        error: true,
        errorMessage: action.payload,
      };
    case actionTypes.bookActions.DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case actionTypes.bookActions.ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case actionTypes.bookActions.EDIT_BOOK:
      const tempArr = [];
      for (var i = 0; i < state.books.length; i++) {
        if (state.books[i].id !== action.payload.id) {
          tempArr.push(state.books[i]);
        } else {
          tempArr.push(action.payload);
        }
      }
      return {
        ...state,
        books: tempArr,
      };
    case actionTypes.bookActions.DELETE_BOOKS_CATEGORY:
      /* payload olarak kategori id`si gelecek */
      var filteredBooks = state.books.filter(
        (item) => item.categoryId !== action.payload
      );
      return {
        ...state,
        books: filteredBooks,
      };
    default:
      return state;
  }
};

export default booksReducer;
