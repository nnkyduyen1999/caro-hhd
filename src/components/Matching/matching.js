import React, { useState, useContext } from "react";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";

const Matching = (props) => {
  const [createdRoom, setCreatedRoom] = useState(null);
  const authenticationContext = useContext(AuthenticationContext);
  const handleClick = () => {
    console.log("click match please wait");
    socket.emit("matching", authenticationContext.authenState.userInfo);
  };

  socket.on("successfullyMatched", (data) => {
    socket.emit('joinRoom', data._id)
    setCreatedRoom(data)
  });

  if (createdRoom) {
    return <Redirect to={{pathname: `/game/${createdRoom._id}`, state: {userXId: createdRoom.userXId, userOId: createdRoom.userOId}}} />;
  }

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<SportsEsportsIcon />}
      onClick={handleClick}
    >
      Chơi ngay
    </Button>
  );
};

export default Matching;
