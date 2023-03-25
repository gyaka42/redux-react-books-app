import React, { useState } from "react";
import Header from "../components/Header";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { upperFirstLetter2 } from "../utils/functions";
import Logout from "../components/Logout";

import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const { categoriesState } = useSelector((state) => state);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === categoryId
  );

  const [form, setForm] = useState(myCategory);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
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

    /* API CALL */

    api
      .put(`${urls.categories}/${categoryId}`, form)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.EDIT_CATEGORY,
          payload: form,
        });
        navigate("/categories");
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
              value={upperFirstLetter2(form.name)}
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
            <button
              disabled={
                upperFirstLetter2(
                  myCategory.name.trim().replaceAll(" ", "")
                ) === upperFirstLetter2(form.name.trim().replaceAll(" ", ""))
                  ? true
                  : false
              }
              type="submit"
              className="btn btn-primary"
            >
              Guncelle
            </button>
          </div>
        </form>
      </div>
      <Logout />
    </div>
  );
};

export default EditCategory;
