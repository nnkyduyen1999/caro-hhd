import { makeStyles } from "@material-ui/core";
import React from "react";
import { BOARD_SIZE } from "../../global/constant";
import Square from "../Square/square";

const Board = (props) => {
  const classes = useStyles()
  const renderSquare = (i) => {
    return (
      <Square
        isCurrent={props.currSquare === i}
        key={`square-${i}`}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        isWinning={props.winningLine.includes(i)}
      />
    );
  };

  let board = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    let row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      row.push(renderSquare(i * BOARD_SIZE + j));
    }
    board.push(
      <div key={`row-${i}`} className={classes.row}>
        {row}
      </div>
    );
  }

  return <div>{board}</div>;
};

const useStyles = makeStyles({
  row: {
    display: 'flex'
  }
})

export default Board;
