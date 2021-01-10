import { Button } from "@material-ui/core";
import React from "react";

const BecomePlayerBtn = (props) => {
  return (
    <Button variant="contained" color="primary" onClick={props.onClick}>
      Become player {props.player}
    </Button>
  );
};

export default BecomePlayerBtn;
