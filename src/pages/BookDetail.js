import React from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import Price from "../components/Price";

import { useSelector } from "react-redux";
import { upperFirstLetter2 } from "../utils/functions";

const BookDetail = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { bookState, categoriesState, themeState } = useSelector(
    (state) => state
  );

  const myBook = bookState.books.find((item) => item.id === bookId);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === myBook.categoryId
  );

  return (
    <div
      style={{ height: "100vh" }}
      className={`${themeState === "light" ? "" : "bg-dark text-light"}`}
    >
      <Header />
      <div className="container my-5 d-flex justify-content-center">
        <div
          style={{
            borderRadius: "10px",
            padding: "30px",
            width: "40%",
            boxShadow: "0px 0px 10px 0 gray",
          }}
        >
          <div
            className="text-center"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <span
              onClick={() => {
                navigate("/");
              }}
              style={{ position: "absolute", left: 0 }}
              className={`badge bg-${
                themeState === "light" ? "secondary" : "primary"
              } fs-5`}
            >
              Geri
            </span>
            <h1>Kitap Bilgileri</h1>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kitap Adi:</b>
            </p>
            <p>{upperFirstLetter2(myBook.title)}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Yazari:</b>
            </p>
            <p>{upperFirstLetter2(myBook.author)}</p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Yayin Evi:</b>
            </p>
            <p>
              {myBook.publisher === ""
                ? "Belirtilmemis"
                : upperFirstLetter2(myBook.publisher)}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Fiyat:</b>
            </p>
            <div>
              {myBook.price === "" ? (
                "Belirtilmemis"
              ) : (
                <Price text={myBook.price} />
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>ISBN:</b>
            </p>
            <p>
              {myBook.isbn === ""
                ? "Belirtilmemis"
                : upperFirstLetter2(myBook.isbn)}
            </p>
          </div>
          <div className="d-flex justify-content-between my-3">
            <p>
              <b>Kategori:</b>
            </p>
            <p>{myCategory.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
