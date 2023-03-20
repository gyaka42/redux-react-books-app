import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useFetcher } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../src/redux/actions/actionTypes";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import Loading from "./components/Loading";
import Error from "./components/Error";
import EditBook from "./pages/EditBook";
import CategoriesHome from "./pages/CategoriesHome";
import AddCategory from "./pages/AddCategory";

import api from "./api/api";
import urls from "./api/urls";

function App() {
  const dispatch = useDispatch();
  const { bookState, categoriesState } = useSelector((state) => state);

  useEffect(() => {
    /* get books */
    dispatch({ type: actionTypes.bookActions.GET_BOOKS_START });
    api
      .get(urls.books)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.bookActions.GET_BOOKS_SUCCESS,
            payload: res.data,
          });
        }, 700);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.bookActions.GET_BOOKS_FAIL,
          payload: "Kitaplari cekme islemi esnasinda bir hata olustu !",
        });
      });

    /* get categories */
    dispatch({ type: actionTypes.categoryActions.GET_CATEGORIES_START });
    api
      .get(urls.categories)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,
            payload: res.data,
          });
        }, 700);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.categoryActions.GET_CATEGORIES_FAIL,
          payload: "Kategori cekme islemi esnasinda bir hata olustu !",
        });
      });
  }, []);

  if (bookState.pending === true || categoriesState.pending === true)
    return <Loading />;

  if (bookState.error === true || categoriesState.error === true)
    return <Error />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/book-detail/:bookId" element={<BookDetail />} />
        <Route path="/edit-book/:bookId" element={<EditBook />} />
        <Route path="/categories" element={<CategoriesHome />} />
        <Route path="/add-category" element={<AddCategory />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
