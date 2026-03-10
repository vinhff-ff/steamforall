import React from "react";

const BtnCustom = ({
  text,
  onClick,
  backgroundColor = "#1677ff",
  color = "#fff",
  borderColor = "#1677ff",
  width = "120px",
  height = "40px",
  className = "",
  disabled = false
}) => {
  return (
    <button
      className={`btn-custom ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor,
        color,
        border: `1px solid ${borderColor}`,
        width,
        height
      }}
    >
      {text}
    </button>
  );
};

export default BtnCustom;