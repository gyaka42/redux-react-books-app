import React from "react";

const Price = ({ text = "" }) => {
  return (
    <p className="fw - bold" style={{ color: "orangered", fontWeight: "bold" }}>
      {text}₺
    </p>
  );
};

export default Price;
