import React from "react";
import { FiLogOut } from "react-icons/fi";

import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";

const Logout = () => {
  const dispatch = useDispatch();
  const { loginState } = useSelector((state) => state);
  return (
    <div
      style={{
        position: "fixed",
        right: 10,
        bottom: 10,
        zIndex: 100,
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#aaa",
      }}
    >
      <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
        <span>Giris Yapan Kullanici: </span>
        <span className="text-primary" style={{ margin: "5px" }}>
          {loginState.username}
        </span>
        <span
          onClick={() => dispatch({ type: actionTypes.loginActions.LOGOUT })}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          <FiLogOut style={{ color: "orangered" }} />
        </span>
      </p>
    </div>
  );
};

export default Logout;
