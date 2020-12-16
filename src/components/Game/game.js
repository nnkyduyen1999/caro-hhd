import React, { useState, useContext, useEffect } from "react";
import { BOARD_SIZE } from "../../global/constant";
import Board from "../Board/board";
import PlaySound from "../PlaySound/play-sound";
import Chat from "../Chat/chat";
import { Grid, Paper, Container, Box, Avatar, Button } from "@material-ui/core";
import { useStyles } from "../Home/useStyle";
import { useParams } from "react-router-dom";
import socket from "../../socket.io/socket.io";
import { AuthenticationContext } from "../../providers/authenticationProvider";

const Game = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthenticationContext);
  const { roomId } = useParams();
  const player =
    props.location.state.userXId === auth.authenState.userInfo._id ? "X" : "O";
  console.log(player);

  const [history, setHistory] = useState([
    { squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [latestLocation, setLatestLocation] = useState(null);

  useEffect(() => {
    if (latestLocation) {
      const historyArr = history.slice(0, stepNumber + 1);
      const current = historyArr[historyArr.length - 1];
      const squares = current.squares.slice();

      squares[latestLocation] = xIsNext ? "X" : "O";

      setHistory(
        historyArr.concat([
          {
            squares: squares,
            location: latestLocation,
          },
        ])
      );
      setStepNumber(historyArr.length);
      setXIsNext(!xIsNext);
    }
  }, [latestLocation]);

  socket.on("acceptedMove", (data) => {
    setLatestLocation(data.location)
  });

  const handleClick = (i) => {
    console.log(i);
    const historyArr = history.slice(0, stepNumber + 1);
    const current = historyArr[historyArr.length - 1];
    const squares = current.squares.slice();

    //TODO: check result
    if (
      squares[i] |
      (xIsNext & (player === "O")) |
      (!xIsNext & (player === "X"))
    ) {
      return;
    }
    console.log("socket req");
    socket.emit("requestMove", {
      roomId: roomId,
      // userId: auth.authenState.userInfo._id,
      xIsNext: xIsNext,
      location: i,
      player: player,
    });
  };

  //setup board game
  const current = history[stepNumber];

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Grid container>
            <Grid item xs={12}>
              <PlaySound />
            </Grid>
            <Grid item xs={12}>
              <Paper>Thoat</Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box>{xIsNext ? "X" : "O"} turn</Box>
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Board
                  squares={current.squares}
                  onClick={(i) => handleClick(i)}
                  currSquare={current.location}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container className={classes.paper} justify="center">
            <Grid item xs={6}>
              <Button variant="outlined" color="secondary">
                Xin thua
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
                <Box textAlign="center">Tỉ số</Box>
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
                  src="https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                  className={classes.large}
                />
                <Box className={classes.userName}>X</Box>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box className={classes.paper}></Box>
            </Grid>
            <Grid item xs={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt="Remy Sharp"
                  src="https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                  className={classes.large}
                />
                <Box className={classes.userName}>O</Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={8}>
              <Chat id={roomId} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
