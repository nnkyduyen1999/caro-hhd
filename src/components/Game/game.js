import React, { useState, useContext, useEffect } from "react";
import { BOARD_SIZE } from "../../global/constant";
import Board from "../Board/board";
import PlaySound from "../PlaySound/play-sound";
import Chat from "../Chat/chat";
import {
  Grid,
  Paper,
  Container,
  Box,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "../Home/useStyle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { calculateWinner } from "../../service/calculateWinner";
import { useParams } from "react-router-dom";
import socket from "../../socket.io/socket.io";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import {
  GIVEN_IN_EVENT,
  REQUEST_MOVE,
  ACCEPT_MOVE,
} from "../../socket.io/socket-event";

const Game = (props) => {
  const classes = useStyles();
  const auth = useContext(AuthenticationContext);
  const player =
    props.location.state.roomInfo.userXId === auth.authenState.userInfo._id
      ? "X"
      : "O";
  console.log(player);
  let { roomId } = useParams();
  const [history, setHistory] = useState([
    { squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStt, setGameStt] = useState(`Bắt đầu X`);
  const [isClickable, setIsClickable] = useState(true);
  const [goal, setGoal] = useState({
    xPoints: 0,
    oPoints: 0,
  });
  const [winningLine, setWinningLine] = useState([]);
  const [latestLocation, setLatestLocation] = useState(null);

  useEffect(() => {
    if (latestLocation) {
      const historyArr = history.slice(0, stepNumber + 1);
      const current = historyArr[historyArr.length - 1];
      const squares = current.squares.slice();

      squares[latestLocation] = xIsNext ? "X" : "O";

      const checkedResult = calculateWinner(squares, latestLocation);
      console.log(checkedResult);
      const { winner, line, draw } = checkedResult;
      if (winner) {
        setGameStt(`${winner} thắng`);
        setIsClickable(false);
        setWinningLine(line);
        if (winner === `X`) {
          setGoal({
            ...goal,
            xPoints: goal.xPoints + 1,
          });
        } else {
          setGoal({
            ...goal,
            oPoints: goal.oPoints + 1,
          });
        }
      } else {
        if (draw) {
          setGameStt(`Hoà`);
          setIsClickable(false);
        } else {
          setGameStt(`Lượt kế tiếp ${xIsNext ? "O" : "X"}`);
        }
      }

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

  socket.on(ACCEPT_MOVE, (data) => {
      console.log("enter here")
    setLatestLocation(data.location);
    console.log("set ok",latestLocation);

  });

  socket.on(GIVEN_IN_EVENT, (data) => {
    setIsClickable(false);
    if (player === data.winner) setGameStt(`Bạn đã thắng do đối thủ xin thua`);
    else setGameStt(`Bạn đã xin thua`);
  });

  const handleClick = (i) => {
    if (!isClickable) {
      setGameStt("Đã có người thắng cuộc, vui lòng chọn ván chơi mới");
      return;
    }

    const historyArr = history.slice(0, stepNumber + 1);
    const current = historyArr[historyArr.length - 1];
    const squares = current.squares.slice();

    if (
      squares[i] |
      (xIsNext & (player === "O")) |
      (!xIsNext & (player === "X"))
    ) {
      return;
    }
    socket.emit(REQUEST_MOVE, {
      roomId: roomId,
      // userId: auth.authenState.userInfo._id,
      xIsNext: xIsNext,
      location: i,
      player: player,
    });
  };

  const handleGiveIn = () => {
    if (
      !isClickable ||
      xIsNext & (player === "O") ||
      !xIsNext & (player === "X")
    ) {
      return;
    }

    socket.emit(GIVEN_IN_EVENT, {
      winner: player === "X" ? "O" : "X",
      roomId,
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
              <IconButton color="secondary" aria-label="exit">
                <ExitToAppIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              {gameStt}
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Board
                  squares={current.squares}
                  onClick={(i) => handleClick(i)}
                  currSquare={current.location}
                  winningLine={winningLine}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container className={classes.paper} justify="center">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleGiveIn}
              >
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
                <Box textAlign="center">
                  {goal.xPoints} : {goal.oPoints}
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
                  src="https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                  className={classes.large}
                />
                <Box className={classes.userName}>
                  {props.location.state.roomInfo.usernameX}
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
                  src="https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                  className={classes.large}
                />
                <Box className={classes.userName}>
                  {props.location.state.roomInfo.usernameO}
                </Box>
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
