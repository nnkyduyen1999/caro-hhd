import React from "react";
import { useStyles } from "./useStyles";

const Square = (props) => {
  const classes = useStyles()
  const XIcon = (
    <img src={process.env.PUBLIC_URL + "/img/XIcon.svg"} alt="icon" />
  );
  const OIcon = (
    <img src={process.env.PUBLIC_URL + "/img/OIcon.svg"} alt="icon" />
  );
  const icon = props.value === "X" ? XIcon : props.value === "O" ? OIcon : null;
  
  return (
    <button className={classes.square} onClick={props.onClick}>
      {icon}
    </button>
  );
};

export default Square;
