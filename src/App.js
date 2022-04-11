import { Component } from "react";
import "./App.css";
import Button from "./Button";

class App extends Component {
  state = {
    speed: 2000,
    score: 0,
    clickedBtn: 0,
    activeNum: 0,
    gameover: false,
  };

  clickHandler = (id) => {
    if (this.state.clickedBtn === id) {
      //GAME OVER
      console.log("Game over event");
    }
    this.setState({
      score: this.state.score + 1,
      clickedBtn: id,
    });
  };

  getRndInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  pickNew = () => {
    let number = this.getRndInt(1, 4);
    if (number === this.state.activeNum) {
      number = this.getRndInt(1, 4);
    } else {
      this.setState({ activeNum: number });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="game">
          <h1 className="header">Speed game</h1>
          <h3 className="scorecounter">
            Your score:{" "}
            <span className="score" name="score">
              {this.state.score}
            </span>
          </h3>
          <div className="buttonrow">
            <Button onClick={() => this.clickHandler(1)} active={this.state.activeNum} />
            <Button onClick={() => this.clickHandler(2)} active={this.state.activeNum} />
            <Button onClick={() => this.clickHandler(3)} active={this.state.activeNum} />
            <Button onClick={() => this.clickHandler(4)} active={this.state.activeNum} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
