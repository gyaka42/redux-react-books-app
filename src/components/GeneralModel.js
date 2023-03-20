import React from "react";
import { useSelector } from "react-redux";

const GeneralModel = ({
  title = "",
  content = "",
  confirmButtonText = "Onayla",
  confirmButtonType = "danger",
  confirmButtonClick = () => {},
  hasConfirmButton = false,
  cancelButtonText = "Kapat",
  cancelButtonType = "primary",
  cancelButtonClick = () => {},
  visible = false,
}) => {
  const { themeState } = useSelector((state) => state);
  if (visible === false) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: 10,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`${themeState === "light" ? "" : "bg-dark text-light"}`}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          width: "40%",
        }}
      >
        <h1 className="text-center">{title}</h1>
        <p className="text-center my-3">{content}</p>
        <div className="d-flex justify-content-center gap-4 my-3">
          <button
            onClick={cancelButtonClick}
            className={`btn btn-${cancelButtonType}`}
          >
            {cancelButtonText}
          </button>
          {hasConfirmButton === true && (
            <button
              onClick={confirmButtonClick}
              className={`btn btn-${confirmButtonType}`}
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralModel;
