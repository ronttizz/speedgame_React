import React from "react";
import classes from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div
      className={`${classes.button} ${props.active ? classes.active : ""}`}
      onClick={props.onClick}
      name={props.id}
    ></div>
  );
};

export default Circle;
