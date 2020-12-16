import React, { useState, useContext } from "react";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";

const Matching = (props) => {
  const [roomId, setRoomId] = useState(null);
  const authenticationContext = useContext(AuthenticationContext);
  const handleClick = () => {
    console.log("click match please wait");
    socket.emit("matching", authenticationContext.authenState.userInfo);
  };

  socket.on("successfullyMatched", (roomId) => {
    socket.emit('joinRoom', roomId)
    setRoomId(roomId);
  });

  if (roomId) {
    return <Redirect to={`/game/${roomId}`} />;
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
