import React from "react";

import Header from "../components/Header";
import Button from "../components/Button";
import ListCategories from "../components/ListCategories";
import Logout from "../components/Logout";

import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const CategoriesHome = () => {
  const navigate = useNavigate();
  const { themeState } = useSelector((state) => state);
  return (
    <div
      style={{ minHeight: "100VH" }}
      className={themeState === "light" ? "bg-light" : "bg-dark"}
    >
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Button
            type={themeState === "light" ? "primary" : "secondary"}
            text="Kategori Ekle"
            onClick={() => navigate("/add-category")}
          />
        </div>
        <ListCategories />
      </div>
      <Logout />
    </div>
  );
};

export default CategoriesHome;
