import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { upperFirstLetter2 } from "../utils/functions";

import api from "../api/api";
import urls from "../api/urls";

import GeneralModel from "./GeneralModel";
import actionTypes from "../redux/actions/actionTypes";

const ListCategories = () => {
  const dispatch = useDispatch();
  const [errorModal, setErrorModal] = useState(false);
  const deleteCategory = (id) => {
    api
      .delete(`${urls.categories}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.categoryActions.DELETE_CATEGORY,
          payload: id,
        });
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOKS_CATEGORY,
          payload: id,
        });
        setErrorModal(false);
      })
      .catch((err) => {});
  };
  const [willDeleteCategory, setWillDeleteCategory] = useState("");

  const { categoriesState, themeState, bookState } = useSelector(
    (state) => state
  );
  return (
    <div>
      {categoriesState.categories.length === 0 && (
        <div className="my-5 d-flex justify-content-center">
          <div className="alert alert-warning text-center w-75" role="alert">
            Sistemde kayitli kategori yok!
          </div>
        </div>
      )}
      {categoriesState.categories.length > 0 && (
        <table
          className={`table table-striped ${
            themeState === "light" ? "table-light" : "table-dark"
          }`}
        >
          <thead>
            <tr>
              <th scope="col">Sira no</th>
              <th scope="col">Kategori adi</th>
              <th scope="col">Kitap Sayisi</th>
              <th scope="col">Islemler</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.map((category, index) => {
              const myBooks = bookState.books.filter(
                (item) => item.categoryId === category.id
              );
              return (
                <tr key={category.id}>
                  <th>{index + 1}</th>
                  <td>{upperFirstLetter2(category.name)}</td>
                  <td>{myBooks.length}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        onClick={() => {
                          setErrorModal(true);
                          setWillDeleteCategory(category.id);
                        }}
                        type="button"
                        className="btn btn-danger btn-sm"
                      >
                        Sil
                      </button>
                      <button type="button" className="btn btn-warning btn-sm">
                        Guncelle
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <GeneralModel
        title="Silme islemi"
        content="Kategori silindiginde o kategoriye ait butun kitaplarda silinir, devam etmek istediginize emin misiniz?"
        cancelButtonText="Vazgec"
        cancelButtonClick={() => setErrorModal(false)}
        hasConfirmButton={true}
        confirmButtonText="Sil"
        confirmButtonClick={() => deleteCategory(willDeleteCategory)}
        visible={errorModal}
      />
    </div>
  );
};

export default ListCategories;
