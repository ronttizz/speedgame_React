import React from "react";
import classes from "./Button.module.css";

function Button(props) {
  return <div className={classes.button} onClick={props.onClick} name={props.id}></div>;
}

export default Button;
