import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { upperFirstLetter, upperFirstLetter2 } from "../utils/functions";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";

import GeneralModel from "./GeneralModel";

const ListBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteBook, setDeleteBook] = useState("");
  const [deleteBookTitle, setDeleteBookTitle] = useState("");

  const { bookState, categoriesState, themeState } = useSelector(
    (state) => state
  );

  const handleDelete = (id) => {
    api
      .delete(`${urls.books}/${id}`)
      .then((res) => {
        dispatch({
          type: actionTypes.bookActions.DELETE_BOOK,
          payload: id,
        });
        setOpenDeleteModal(false);
      })
      .catch((err) => {
        console.log("silerken hata olustu", err);
      });
  };

  return (
    <div>
      {bookState.books.length === 0 && (
        <div className="my-5 d-flex justify-content-center">
          <div className="alert alert-warning text-center w-75" role="alert">
            Sistemde kayitli kitap yok!
          </div>
        </div>
      )}
      {bookState.books.length > 0 && (
        <div>
          <table
            className={`table table-striped ${
              themeState === "light" ? "table-light" : "table-dark"
            }`}
          >
            <thead>
              <tr>
                <th scope="col">Sira no</th>
                <th scope="col">Kitap adi</th>
                <th scope="col">Kategori</th>
                <th scope="col">Islemler</th>
              </tr>
            </thead>
            <tbody>
              {bookState.books.map((book, index) => {
                const myCategory = categoriesState.categories.find(
                  (item) => item.id === book.categoryId
                );
                return (
                  <tr key={book.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{upperFirstLetter2(book.title)}</td>
                    <td>{upperFirstLetter(myCategory.name)}</td>
                    <td>
                      <div className="btn-group" role="group">
                        <Button
                          className="btn-sm"
                          text="Detay"
                          type="secondary"
                          onClick={() => {
                            navigate(`/book-detail/${book.id}`);
                          }}
                        />
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            setOpenDeleteModal(true), setDeleteBook(book.id);
                            setDeleteBookTitle(book.title);
                          }}
                          text="Sil"
                          type="danger"
                        />
                        <Button
                          style={{
                            border: "none",
                            backgroundColor: "#FFA62F",
                            color: "white",
                          }}
                          onClick={() => {
                            navigate(`/edit-book/${book.id}`);
                          }}
                          className="btn-sm"
                          text="Guncelle"
                          type="warning"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <GeneralModel
        title={`"${deleteBookTitle}" kitabı silinecek!`}
        content="Emin misiniz?"
        hasConfirmButton={true}
        confirmButtonText="Sil"
        cancelButtonText="Vazgec"
        confirmButtonClick={() => {
          handleDelete(deleteBook);
        }}
        cancelButtonClick={() => {
          setOpenDeleteModal(false);
        }}
        visible={openDeleteModal}
      />
    </div>
  );
};

export default ListBooks;
