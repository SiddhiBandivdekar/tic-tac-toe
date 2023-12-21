import { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));

  const handleClick = (clickPosition) => {
    setState((currentClickPosition) => {
      return currentClickPosition.map((squareVal, position) => {
        if (clickPosition === position) {
          return "X";
        }
        return squareVal;
      });
    });
  };

  const renderSquare = (position) => {
    return (
      <Square value={state[position]} onClick={() => handleClick(position)} />
    );
  };

  return (
    <div className="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
