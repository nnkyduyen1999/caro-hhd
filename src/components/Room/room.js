import { CircularProgress } from "@material-ui/core";
import {
  Grid,
  Paper,
  Container,
  Box,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "./useStyle";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import { apiLoadRoomWithPlayerInfoById } from "../../service/room-service";
import PlaySound from "../PlaySound/play-sound";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BecomePlayerBtn from "./BecomePlayerBtn/become-player-btn";
import socket from "../../socket.io/socket.io";
import {
  BECOME_PLAYER,
  UPDATE_CURRENT_PLAYER,
  JOIN_ROOM,
} from "../../socket.io/socket-event";

const Room = (props) => {
  const classes = useStyles();
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [isCurrPlayer, setIsCurrPlayer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [xReady, setXReady] = useState(false);
  const [yReady, setYReady] = useState(false);
  const auth = useContext(AuthenticationContext);

  socket.emit(JOIN_ROOM, roomId);

  useEffect(() => {
    apiLoadRoomWithPlayerInfoById(roomId)
      .then((res) => {
        console.log(res.data);
        setRoomInfo(res.data);
        setIsLoading(false);
        if (
          auth.authenState.userInfo._id === res.data.xCurrentPlayer ||
          auth.authenState.userInfo._id === res.data.oCurrentPlayer
        ) {
          setIsCurrPlayer(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnClickBecomePlayer = (player) => {
    const sendData = {
      user: {
        _id: auth.authenState.userInfo._id,
        // trophy: auth.authenState.userInfo.trophy,
        username: auth.authenState.userInfo.username,
      },
      player: player,
      roomId: roomId,
    };
    socket.emit(BECOME_PLAYER, sendData);
  };

  socket.on(UPDATE_CURRENT_PLAYER, (data) => {
    console.log("socket update ", data, roomInfo);
    if (data.player === "X") {
      setRoomInfo({
        ...roomInfo,
        xCurrentPlayer: data.user._id,
        xPlayerUsername: data.user.username,
      });
    } else if (data.player === "O") {
      setRoomInfo({
        ...roomInfo,
        oCurrentPlayer: data.user._id,
        oPlayerUsername: data.user.username,
      });
    }
    if (auth.authenState.userInfo._id === data.user._id) {
      setIsCurrPlayer(true);
    }
  });

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Grid container>
            <Grid item xs={12}>
              <PlaySound />
            </Grid>
            <Grid item xs={12}>
              <IconButton color="secondary" aria-label="exit">
                <ExitToAppIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              {/* {gameStt} */}
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                {/* <Board
                  squares={current.squares}
                  onClick={(i) => handleClick(i)}
                  currSquare={current.location}
                  winningLine={winningLine}
                /> */}
              </Box>
            </Grid>
          </Grid>
          <Grid container className={classes.paper} justify="center">
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleGiveIn}
              >
                READY
              </Button>
            </Grid>
          </Grid>
          <Grid container className={classes.paper} justify="center">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                // onClick={handleGiveIn}
              >
                Give up
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="space-around" className={classes.paper}>
              <Grid item xs={3} display="flex" justify="center">
                <img
                  src={process.env.PUBLIC_URL + "/img/XIcon.svg"}
                  alt="icon"
                  className={classes.square}
                />
              </Grid>
              <Grid item xs={3}>
                <Box textAlign="center">
                  {/* {goal.xPoints} : {goal.oPoints} */}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <img
                  src={process.env.PUBLIC_URL + "/img/OIcon.svg"}
                  alt="icon"
                  className={classes.square}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container justify="space-around" className={classes.paper}>
            <Grid item xs={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    roomInfo.xPlayerUsername
                      ? "https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                      : process.env.PUBLIC_URL + "/img/user.svg"
                  }
                  className={classes.large}
                />
                <Box className={classes.userName}>
                  {roomInfo.xCurrentPlayer ? (
                    roomInfo.xPlayerUsername
                  ) : !isCurrPlayer ? (
                    <BecomePlayerBtn
                      player="X"
                      onClick={() => handleOnClickBecomePlayer("X")}
                    />
                  ) : null}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.paper}></Box>
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    roomInfo.oPlayerUsername
                      ? "https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                      : process.env.PUBLIC_URL + "/img/user.svg"
                  }
                  className={classes.large}
                />
                <Box className={classes.userName}>
                  {roomInfo.oCurrentPlayer ? (
                    roomInfo.oPlayerUsername
                  ) : !isCurrPlayer ? (
                    <BecomePlayerBtn
                      player="O"
                      onClick={() => handleOnClickBecomePlayer("O")}
                    />
                  ) : null}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={8}>
              {/* <Chat id={roomId} /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Room;
