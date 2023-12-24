const StatusMessage = ({ winner, game }) => {
  const { squares, isXNext } = game;
  const nextPlayer = isXNext ? "X" : "0";

  const noMovesLeft = squares.every((squareVal) => squareVal !== null);

  const renderMessage = () => {
    if (winner) {
      return (
        <div>
          Winner is{" "}
          <span className={isXNext ? "text-green" : "text-orange"}>
            {winner}
          </span>
        </div>
      );
    }
    if (!winner && noMovesLeft) {
      return (
        <div>
          <span className="text-green">X</span> and{" "}
          <span className="text-orange">0</span> have tied!
        </div>
      );
    }
    if (!winner && !noMovesLeft) {
      return (
        <div>
          Next player is{" "}
          <span className={isXNext ? "text-green" : "text-orange"}>
            {nextPlayer}
          </span>
        </div>
      );
    }
    return null;
  };

  return <div className="status-message">{renderMessage()}</div>;
};

export default StatusMessage;
