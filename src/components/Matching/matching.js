import React, { useState, useContext } from "react";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import { JOIN_ROOM, MATCHING, SUCCESSFULLY_MATCHED } from "../../socket.io/socket-event";

const Matching = (props) => {
  const [createdRoom, setCreatedRoom] = useState(null);
  const authenticationContext = useContext(AuthenticationContext);
  const handleClick = () => {
    const sendData = {
      _id: authenticationContext.authenState.userInfo._id,
      trophy: authenticationContext.authenState.userInfo.trophy,
      username: authenticationContext.authenState.userInfo.username
    }
    socket.emit(MATCHING, sendData);
  };

  socket.on(SUCCESSFULLY_MATCHED, (roomId) => {
    socket.emit(JOIN_ROOM, roomId)
    setCreatedRoom(roomId)
  });

  if (createdRoom) {
    console.log(createdRoom)
    return <Redirect to={{pathname: `/game/${createdRoom}`, state: {roomInfo: createdRoom}}} />;
  }

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<SportsEsportsIcon />}
      onClick={handleClick}
      style={{marginTop: 20}}
    >
      Chơi ngay
    </Button>
  );
};

export default Matching;
