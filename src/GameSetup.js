import React from "react";

import classes from "./GameSetup.module.css";

const GameSetup = (props) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h2 className={classes.header}>Select difficulty</h2>
        <div>
          <button className={classes.difficultyBtn} onClick={props.onClick(1)}>
            Easy
          </button>
          <button className={classes.difficultyBtn} onClick={props.onClick(2)}>
            Medium
          </button>
          <button className={classes.difficultyBtn} onClick={props.onClick(3)}>
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSetup;
