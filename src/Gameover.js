import React from "react";
import classes from "./Gameover.module.css";

const Gameover = (props) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h3>GAME OVER:</h3>
        <p>Your score was: {props.score}</p>
        <button className={classes.closeBtn} onClick={props.onClick}>
          X
        </button>
      </div>
    </div>
  );
};

export default Gameover;
