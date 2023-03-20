import React from "react";

const Error = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="alert alert-danger" role="alert">
        Uygulama yuklerken bir hata olustu, lutfen daha sonra tekrar deneyin.
      </div>
    </div>
  );
};

export default Error;
