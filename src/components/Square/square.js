import React from "react";
import { useStyles } from "./useStyles";

const Square = (props) => {
  const classes = useStyles();
  const XIcon = <img src={process.env.PUBLIC_URL + "/img/XIcon.svg"} alt="X" />;
  const OIcon = <img src={process.env.PUBLIC_URL + "/img/OIcon.svg"} alt="O" />;
  const icon = props.value === "X" ? XIcon : props.value === "O" ? OIcon : null;
  const buttonStyle = props.isWinning
    ? `${classes.square} ${classes.winningSquare}`
    : props.isCurrent
    ? `${classes.square} ${classes.currSquare}`
    : classes.square;

  return (
    <button className={buttonStyle} onClick={props.onClick}>
      {icon}
    </button>
  );
};

export default Square;
