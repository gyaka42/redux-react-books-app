import React, { useState, useRef } from "react";
import Header from "../components/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { upperFirstLetter2 } from "../utils/functions";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditBook = () => {
  //   const titleRef = useRef();
  //   const authorRef = useRef();
  const { bookId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookState, categoriesState } = useSelector((state) => state);
  const MyBook = bookState.books.find((item) => item.id === bookId);
  const [formState, setFormState] = useState(MyBook);
  const [errorType, setErrorType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (formState.categoryId === "empty") {
      alert("Kategori alani zorunludur");
      return;
    }
    if (formState.title === "") {
      //alert("Kitap adi alani zorunludur");
      //   titleRef.current.style.display = "block";
      setErrorType("title");
      setErrorMessage("Kitap adi zorunludur!");
      return;
    }
    if (formState.author === "") {
      //alert("Kitap yazarari alani zorunludur");
      //   authorRef.current.style.display = "block";
      setErrorType("author");
      setErrorMessage("Yazar adi zorunludur!");
      return;
    }

    api
      .put(`${urls.books}/${bookId}`, formState)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.EDIT_BOOK,
          payload: formState,
        });
        navigate("/");
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Header />
      <div className="container my-5 w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Kitap Adi
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Orn: Nutuk"
              value={formState.title}
              onChange={(event) =>
                setFormState({ ...formState, title: event.target.value })
              }
            />
            {/* <p ref={titleRef}  style={{ display: "none" }}>
              <small className="text-danger">Kitap alani zorunludur!</small>
            </p> */}
            {errorType === "title" && (
              <p>
                <small className="text-danger">{errorMessage}</small>
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Kitap Yazari
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              placeholder="Orn: Ozdemir Asaf"
              value={formState.author}
              onChange={(event) =>
                setFormState({ ...formState, author: event.target.value })
              }
            />
            {/* <p ref={authorRef} style={{ display: "none" }}>
              <small className="text-danger">Yazar alani zorunludur!</small>
            </p> */}
            {errorType === "author" && (
              <p>
                <small className="text-danger">{errorMessage}</small>
              </p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Yayin Evi
            </label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              placeholder="Orn: Iletisim"
              value={formState.publisher}
              onChange={(event) =>
                setFormState({ ...formState, publisher: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Fiyat
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="Orn: 70₺"
              value={formState.price}
              onChange={(event) =>
                setFormState({ ...formState, price: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="isbn" className="form-label">
              ISBN
            </label>
            <input
              type="number"
              className="form-control"
              id="isbn"
              placeholder="Orn: XXXXXXXXXXX"
              value={formState.isbn}
              onChange={(event) =>
                setFormState({ ...formState, isbn: event.target.value })
              }
            />
          </div>
          <p>Kategori</p>
          <select
            value={formState.categoryId}
            onChange={(event) =>
              setFormState({ ...formState, categoryId: event.target.value })
            }
            className="form-select"
          >
            <option value="empty">Kategori Secin</option>
            {categoriesState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {upperFirstLetter2(category.name)}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;
