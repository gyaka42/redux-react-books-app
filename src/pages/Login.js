import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GeneralModel from "../components/GeneralModel";

import { useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const usenameRef = useRef();
  const passwordRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = (event) => {
    const username = "admin";
    const password = "123456";
    event.preventDefault();
    if (!form.username && !form.password) {
      usenameRef.current.style.display = "block";
      passwordRef.current.style.display = "block";
      setTimeout(() => {
        usenameRef.current.style.display = "none";
        passwordRef.current.style.display = "none";
      }, 2000);
      return;
    }
    if (!form.username) {
      usenameRef.current.style.display = "block";
      setTimeout(() => {
        usenameRef.current.style.display = "none";
      }, 2000);
      return;
    }
    if (!form.password) {
      passwordRef.current.style.display = "block";
      setTimeout(() => {
        passwordRef.current.style.display = "none";
      }, 2000);
      return;
    }
    /* normalde api call yapilmasi lazim. ama biz simdilik yapmisiz gibi dusunecegiz */
    if (form.username !== username || form.password !== password) {
      setShowModal(true);
      setModalMessage("Kullanici adiniz yada Sifreniz yanlis");
      return;
    }
    dispatch({
      type: actionTypes.loginActions.LOGIN_SUCCESS,
      payload: form.username,
    });
    navigate("/");
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "25%",
          padding: "20px",
          borderRadius: "5px",
          boxShadow: "0px 0px 10px 0px gray",
        }}
      >
        <div>
          <label htmlFor="username" className="form-label">
            Kullanici adi:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Kullanici adinizi girin"
            value={form.username}
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
            autoComplete="off"
          />
          <p
            ref={usenameRef}
            style={{ display: "none" }}
            className="text-danger"
          >
            <small>Kullanici adi bos birakilamaz</small>
          </p>
        </div>
        <div style={{ position: "relative" }} className="my-3">
          <label htmlFor="password" className="form-label">
            Sifre:
          </label>
          <input
            type={!showPassword ? "password" : "text"}
            className="form-control"
            id="password"
            placeholder="Sifrenizi girin"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            autoComplete="new-password"
          />
          <div
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              cursor: "pointer",
            }}
          >
            {!showPassword ? (
              <FaEye onClick={() => setShowPassword(true)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(false)} />
            )}
          </div>
          <p
            ref={passwordRef}
            style={{ display: "none" }}
            className="text-danger"
          >
            <small>Sifre bos birakilamaz</small>
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn btn-primary w-50 my-4">
            Giris
          </button>
        </div>
      </form>
      <GeneralModel
        visible={showModal}
        title="HATA"
        content={modalMessage}
        cancelButtonClick={() => setShowModal(false)}
      />
    </div>
  );
};

export default Login;
