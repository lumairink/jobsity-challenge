import React from "react";
import "./styles.css";

const Button = ({ text, onClick, color }) => {
  const style = color ? { backgroundColor: color, borderColor: color } : {};
  return (
    <button style={style} className="custom-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
