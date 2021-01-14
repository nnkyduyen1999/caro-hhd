import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';

const ExitRoom = (props) => {
  
  return (
    <div>
      <IconButton color="secondary" onClick={props.onClick} disabled={props.disabled}>
        <AssignmentReturnIcon /> 
      </IconButton>
    </div>
  );
};

export default ExitRoom;
