import { Component } from "react";

import "./App.css";
import Circle from "./Circle";
import Button from "./Button";
import Gameover from "./Gameover";

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    score: 0,
    current: null,
    circles: [0, 0, 0, 0],
    showGameOver: false,
  };

  timer = undefined;

  clickHandler = (id) => {
    console.log(id + " button was clicked!");
    this.setState({ ...this.state, score: this.state.score + 1 });
  };

  nextCircle = () => {
    let nextActive;

    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
    });

    console.log("active circle: ", this.state.current);

    this.timer = setTimeout(this.nextCircle, 1000);
  };

  startHandler = () => {
    this.nextCircle();
  };

  stopHandler = () => {
    clearTimeout(this.timer);
    this.setState({ current: null, showGameOver: true });
  };

  closeHandler = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <div className="game">
          <h1 className="header">Speed game</h1>
          <h3 className="scorecounter">
            Your score:
            <span className="score" name="score">
              {this.state.score}
            </span>
          </h3>
          <div className="buttonrow">
            {this.state.circles.map((_, i) => {
              return (
                <Circle
                  key={i}
                  id={i}
                  onClick={() => this.clickHandler(i)}
                  active={this.state.current === i}
                ></Circle>
              );
            })}
          </div>
          <div>
            <Button onClick={this.startHandler}>START</Button>
            <Button onClick={this.stopHandler}>STOP</Button>
          </div>
          {this.state.showGameOver && (
            <Gameover score={this.state.score} onClick={this.closeHandler} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
