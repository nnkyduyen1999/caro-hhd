import React, { useState } from "react";
import { BOARD_SIZE } from "../../global/constant";
import Board from "../Board/board";
import PlaySound from "../PlaySound/play-sound";

const Game = (props) => {
  const [history, setHistory] = useState([
    { squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    console.log(i)
    const historyArr = history.slice(0, stepNumber + 1);
    const current = historyArr[historyArr.length - 1];
    const squares = current.squares.slice();

    //TODO: check result
    if (squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      historyArr.concat([
        {
          squares: squares,
          location: i,
        },
      ])
    );
    setStepNumber(historyArr.length);
    setXIsNext(!xIsNext);
    console.log(historyArr);
  };

  //setup board game
  const current = history[stepNumber];

  return (
    <div>
      <PlaySound />
      <Board squares={current.squares} onClick={(i) => handleClick(i)} />
    </div>
  );
};



export default Game;
