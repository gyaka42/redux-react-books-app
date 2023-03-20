import React from "react";
import { useSelector, useDispatch } from "react-redux";

import actionTypes from "../redux/actions/actionTypes";

import { Link } from "react-router-dom";

import sun from "../assets/sun.gif";
import moon from "../assets/moon.gif";

const Header = () => {
  const dispatch = useDispatch();
  const { themeState, bookState, categoriesState } = useSelector(
    (state) => state
  );
  return (
    <nav
      style={{ position: "relative" }}
      className={`navbar navbar-expand-sm navbar-dark bg-${
        themeState === "light" ? "primary" : "secondary"
      }`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Library App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={"/"}>
                Kitap Islemleri
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={"/categories"}>
                Kategori Islemleri
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#fff",
        }}
      >
        <div>
          <p style={{ margin: 0 }}>
            Toplam Kitap Sayisi: {bookState.books.length}
          </p>
          <p style={{ margin: 0 }}>
            Toplam Kategori Sayisi: {categoriesState.categories.length}
          </p>
        </div>
        {themeState === "light" ? (
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.themeActions.CHANGE_THEME,
                payload: "dark",
              })
            }
            className="btn btn-sm btn-secondary"
          >
            <img
              style={{
                width: "20px",
                height: "20px",
                marginRight: "12px",
              }}
              src={moon}
            />
            <span>Dark</span>
          </button>
        ) : (
          <button
            onClick={() =>
              dispatch({
                type: actionTypes.themeActions.CHANGE_THEME,
                payload: "light",
              })
            }
            className="btn btn-sm btn-warning"
          >
            <img
              style={{
                width: "20px",
                height: "20px",
                marginRight: "10px",
              }}
              src={sun}
            />
            <span>Light</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
