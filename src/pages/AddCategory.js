import React, { useState } from "react";
import Header from "../components/Header";
import actionTypes from "../redux/actions/actionTypes";

import { upperFirstLetter2 } from "../utils/functions";
import GeneralModel from "../components/GeneralModel";

import api from "../api/api";
import urls from "../api/urls";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /* Validation */
    if (!form.name) {
      setError(true);
      setErrorMessage("Kategori adi bos birakilamaz");
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) =>
        upperFirstLetter2(item.name.trim().replaceAll(" ", "")) ===
        upperFirstLetter2(form.name.trim().replaceAll(" ", ""))
    );
    if (hasCategory) {
      setError(true);
      setErrorMessage(
        `${upperFirstLetter2(
          hasCategory.name
        )} ismiyle zaten bir kategori kayitlidir.`
      );
      setTimeout(() => {
        setError(false);
      }, 2000);
    }

    /* api call */

    api
      .post(urls.categories, form)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.ADD_CATEGORY,
          payload: form,
        });
        setOpenSuccessModal(true);
      })
      .catch((err) => {});
  };

  return (
    <div>
      <Header />
      <div className="container my-5 w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Kategori Adi
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Orn: Bilim Kurgu"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
            {error && (
              <p>
                <small className="text-danger">{errorMessage}</small>
              </p>
            )}
          </div>
          <div className="d-flex justify-content-center my-5">
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      <GeneralModel
        title="Basarili"
        content="Kategori basariyla eklendi"
        cancelButtonText="Anasayfaya don"
        cancelButtonType="success"
        cancelButtonClick={() => {
          navigate("/categories");
        }}
        visible={openSuccessModal}
      />
    </div>
  );
};

export default AddCategory;
