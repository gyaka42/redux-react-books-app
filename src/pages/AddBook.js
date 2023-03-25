import React, { useState } from "react";
import Header from "../components/Header";

import { upperFirstLetter2 } from "../utils/functions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

import GeneralModel from "../components/GeneralModel";

const AddBook = () => {
  const { categoriesState, themeState } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [formState, setFormState] = useState({
    id: String(new Date().getTime()),
    title: "",
    author: "",
    publisher: "",
    price: "",
    isbn: "",
    categoryId: "empty",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (formState.categoryId === "empty") {
      alert("Kategori alani zorunludur");
      return;
    }
    if (formState.title === "") {
      alert("Kitap adi alani zorunludur");
      return;
    }
    if (formState.author === "") {
      alert("Kitap yazarari alani zorunludur");
      return;
    }

    api
      .post(urls.books, formState)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.ADD_BOOK,
          payload: formState,
        });
        setOpenSuccessModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className={`${themeState === "light" ? "" : "bg-dark text-light"}`}
      style={{ height: "100vh" }}
    >
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
      <GeneralModel
        title="Basarili"
        content="Kitap basariyla eklendi"
        cancelButtonText="Anasayfaya Don"
        cancelButtonType="success"
        cancelButtonClick={() => {
          navigate("/");
        }}
        visible={openSuccessModal}
      />
      <Logout />
    </div>
  );
};

export default AddBook;
