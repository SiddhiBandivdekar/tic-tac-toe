import "./components/styles.scss";
import { useState } from "react";
import Board from "./components/Board";
import { calculatedWinner } from "./components/winner";
import StatusMessage from "./components/StatusMessage";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calculatedWinner(squares);
  const handleClick = (clickPosition) => {
    if (squares[clickPosition] || winner) {
      return;
    }

    setSquares((currentClickPosition) => {
      return currentClickPosition.map((squareVal, position) => {
        if (clickPosition === position) {
          return isXNext ? "X" : "0";
        }
        return squareVal;
      });
    });
    setIsXNext((currvValue) => !currvValue);
  };

  return (
    <div className="app">
      <h2>
        <StatusMessage winner={winner} isXNext={isXNext}  squares={squares}/>
      </h2>
      <Board handleClick={handleClick} squares={squares} />
    </div>
  );
};

export default App;
