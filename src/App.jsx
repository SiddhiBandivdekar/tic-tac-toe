import "./components/styles.scss";
import { useState } from "react";
import Board from "./components/Board";
import { calculatedWinner } from "./components/winner";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currMove, setCurrMove] = useState(0);

  const game = history[currMove];
  const winner = calculatedWinner(game.squares);

  const handleClick = (clickPosition) => {
    if (game.squares[clickPosition] || winner) {
      return;
    }
    setHistory((currentHistory) => {
      const isTraversing = currMove + 1 !== currentHistory.length;

      const lastGameState = isTraversing
        ? currentHistory[currMove]
        : history[history.length - 1];

      const nextSquareState = lastGameState.squares.map(
        (squareVal, position) => {
          if (clickPosition === position) {
            return lastGameState.isXNext ? "X" : "0";
          }
          return squareVal;
        },
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGameState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquareState,
        isXNext: !lastGameState.isXNext,
      });
    });
    setCurrMove((move) => move + 1);
  };

  const moveTo = (move) => {
    return setCurrMove(move);
  };

  const newGameHandler = () => {
    setHistory(NEW_GAME);
    setCurrMove(0);
  };

  return (
    <div className="app">
      <h2>
        <StatusMessage winner={winner} game={game} />
      </h2>
      <Board handleClick={handleClick} squares={game.squares} />
      <button
        type="button"
        onClick={newGameHandler}
        className={`btn-reset ${winner ? "active" : ""}`}
      >
        Start a new game
      </button>
      <h2>Current game history</h2>
      <History history={history} moveTo={moveTo} currMove={currMove} />
    </div>
  );
};

export default App;
