import React from "react";
import classes from "./Gameover.module.css";

const Gameover = (props) => {
  let message = "";
  if (props.score <= 5) {
    message = "You can do better";
  } else if (props.score <= 10) {
    message = "Getting there!";
  } else if (props.score <= 20) {
    message = "You are really good";
  } else if (props.score >= 30) {
    message = "INSANE SCORE";
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h3 className={classes.header}>GAME OVER</h3>
        <p>Your score was: {props.score}</p>
        <p>{message}</p>
        <button className={classes.closeBtn} onClick={props.onClick}>
          X
        </button>
      </div>
    </div>
  );
};

export default Gameover;
