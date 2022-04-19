import { Component } from "react";

import "./App.css";
import Circle from "./Circle";
import Button from "./Button";
import Gameover from "./Gameover";
import GameSetup from "./GameSetup";

// sounds
// Sound by <a href="/users/irinairinafomicheva-25140203/?tab=audio&amp;utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=audio&amp;utm_content=13693">irinairinafomicheva</a> from <a href="https://pixabay.com/music/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">Pixabay</a>
import bgMusic from "./assets/sounds/8-bit-cartoon-comedy-by-prettysleepy-art-12290.mp3";

// Music by <a href="/users/prettysleepy-2973588/?tab=audio&amp;utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=audio&amp;utm_content=12290">Prettysleepy</a> from <a href="https://pixabay.com/music/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=12290">Pixabay</a>
import clickSFX from "./assets/sounds/rclick-13693.mp3";

// Music from <a href="https://pixabay.com/music/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=6185">Pixabay</a>
import victorySound from "./assets/sounds/success-fanfare-trumpets-6185.mp3";

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const click = new Audio(clickSFX);
const music = new Audio(bgMusic);
const victory = new Audio(victorySound);

class App extends Component {
  state = {
    score: 0, // stores points
    current: null, // stores current circle id number
    circles: [0, 0, 0, 0], // stores array to loop circle buttons
    showGameOver: false, // gameover modal bool
    gameStarted: false, // if game has started
    clicked: false, // stores info if current circle is clicked
    pace: 1000, // stores the pace how fast circles are changing in ms (milliseconds)
    rounds: 0, // stores number of circles missed
    maxRounds: 3, // stores how many rounds player can miss
    difficulty: null, // difficulty for later use, not in use now
  };

  timer = undefined;

  clickPlay = () => {
    if (click.paused) {
      click.play();
    } else {
      click.currentTime = 0;
    }
  };

  gameSetupHandler = (n) => {
    switch (n) {
      case 1:
        this.setState({
          difficulty: 1,
        });
        break;
      case 2:
        this.setState({
          difficulty: 2,
        });
        break;
      case 3:
        this.setState({
          difficulty: 3,
        });
        break;
    }
  };

  clickHandler = (id) => {
    this.clickPlay();
    if (this.state.gameStarted) {
      if (this.state.current === id && !this.state.clicked) {
        this.setState({
          ...this.state,
          score: this.state.score + 1,
          clicked: true,
          rounds: this.state.rounds - 1,
        });
      } else {
        this.stopHandler();
      }
    }
  };

  nextCircle = () => {
    if (this.state.rounds >= this.state.maxRounds) {
      this.stopHandler();
      return;
    }
    let nextActive;

    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);

    this.setState({
      current: nextActive,
      clicked: false,
      pace: this.state.pace * 0.9,
      rounds: this.state.rounds + 1,
    });

    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    music.play();
    music.loop = true;
    this.setState({
      gameStarted: true,
    });
    this.nextCircle();
  };

  stopHandler = () => {
    music.pause();
    victory.play();
    clearTimeout(this.timer);
    this.setState({ current: null, showGameOver: true, gameStarted: false });
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
            {!this.state.gameStarted && (
              <Button onClick={this.startHandler}>START</Button>
            )}
            {this.state.gameStarted && <Button onClick={this.stopHandler}>STOP</Button>}
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
