import React from "react";

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import ListBooks from "../components/ListBooks";
import { useSelector } from "react-redux";
import Logout from "../components/Logout";

const Home = () => {
  const { themeState } = useSelector((state) => state);
  const navigate = useNavigate();
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
            text="Kitap Ekle"
            onClick={() => navigate("/add-book")}
          />
        </div>
        <ListBooks />
      </div>
      <Logout />
    </div>
  );
};

export default Home;
