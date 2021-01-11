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
import {
  apiLoadRoomWithPlayerInfoById,
  apiLoadLatestGameInRoomById,
} from "../../service/room-service";
import PlaySound from "../PlaySound/play-sound";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BecomePlayerBtn from "./BecomePlayerBtn/become-player-btn";
import socket from "../../socket.io/socket.io";
import {
  BECOME_PLAYER,
  UPDATE_CURRENT_PLAYER,
  JOIN_ROOM,
  UPDATE_READY_STATUS,
  START_GAME,
  REQUEST_MOVE,
  ACCEPT_MOVE,
} from "../../socket.io/socket-event";
import Board from "../Board/board";
import { BOARD_SIZE } from "../../global/constant";
import { calculateWinner } from "../../service/calculateWinner";

const Room = (props) => {
  const classes = useStyles();
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [game, setGame] = useState(null);
  const [isCurrPlayer, setIsCurrPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthenticationContext);

  // game state
  const [history, setHistory] = useState([
    { squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStt, setGameStt] = useState(`Bắt đầu X`);
  const [isClickable, setIsClickable] = useState(true);
  const [winningLine, setWinningLine] = useState([]);
  const [latestLocation, setLatestLocation] = useState(null);

  socket.emit(JOIN_ROOM, roomId);

  // load room info
  useEffect(() => {
    apiLoadRoomWithPlayerInfoById(roomId)
      .then((res) => {
        console.log(res.data);
        setRoomInfo(res.data);
        setIsLoading(false);
        if (auth.authenState.userInfo._id === res.data.xCurrentPlayer) {
          setIsCurrPlayer("X");
        } else if (auth.authenState.userInfo._id === res.data.oCurrentPlayer) {
          setIsCurrPlayer("O");
        }

        //load game info if room is playing
        if (res.data.isPlaying) {
          apiLoadLatestGameInRoomById(roomId)
            .then((resGame) => {
              setHistory(resGame.data.game.history);
              setStepNumber(resGame.data.stepNumber);
              setXIsNext(resGame.data.xIsNext);
              setGameStt(
                resGame.data.stepNumber === 0
                  ? "Bắt đầu X"
                  : `Lượt kế tiếp ${resGame.data.xIsNext ? "X" : "O"}`
              );
              setLatestLocation(resGame.data.latestLocation);
              setGame(resGame.data.game);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
        // if (winner === `X`) {
        //   setGoal({
        //     ...goal,
        //     xPoints: goal.xPoints + 1,
        //   });
        // } else {
        //   setGoal({
        //     ...goal,
        //     oPoints: goal.oPoints + 1,
        //   });
        // }
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

  const renderReadyStatus = (player, status) => {
    if (!roomInfo.isPlaying) {
      if (player === "X") {
        return status ? <div>READY</div> : null;
      } else if (player === "O") {
        return status ? <div>READY</div> : null;
      }
    }
  };

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
    if (data.player === "X") {
      setRoomInfo({
        ...roomInfo,
        xCurrentPlayer: data.user._id,
        xPlayerUsername: data.user.username,
      });
      if (auth.authenState.userInfo._id === data.user._id) {
        setIsCurrPlayer("X");
      }
    } else if (data.player === "O") {
      setRoomInfo({
        ...roomInfo,
        oCurrentPlayer: data.user._id,
        oPlayerUsername: data.user.username,
      });
      if (auth.authenState.userInfo._id === data.user._id) {
        setIsCurrPlayer("O");
      }
    }
  });

  const handleOnClickReady = () => {
    if (isCurrPlayer) {
      const sendData = {
        roomId: roomId,
        player: isCurrPlayer,
        xPlayerReady:
          isCurrPlayer === "X" ? !roomInfo.xPlayerReady : roomInfo.xPlayerReady,
        oPlayerReady:
          isCurrPlayer === "O" ? !roomInfo.oPlayerReady : roomInfo.oPlayerReady,
        xCurrentPlayer: roomInfo.xCurrentPlayer,
        oCurrentPlayer: roomInfo.oCurrentPlayer,

        // status:
        //   isCurrPlayer === "X"
        //     ? !roomInfo.xPlayerReady
        //     : !roomInfo.oPlayerReady,
        // otherPlayerStatus:
        //   isCurrPlayer === "X" ? roomInfo.oPlayerReady : roomInfo.xPlayerReady,
      };
      console.log(sendData);
      socket.emit(UPDATE_READY_STATUS, sendData);
    }
  };

  socket.on(UPDATE_READY_STATUS, (data) => {
    if (data.player === "X") {
      setRoomInfo({
        ...roomInfo,
        xPlayerReady: data.xPlayerReady,
      });
    } else if (data.player === "O") {
      setRoomInfo({
        ...roomInfo,
        oPlayerReady: data.oPlayerReady,
      });
    }
  });

  socket.on(START_GAME, (game) => {
    setRoomInfo({
      ...roomInfo,
      oPlayerReady: false,
      xPlayerReady: false,
      isPlaying: true,
    });
    setGame(game);
    setGameStt("Bắt đầu X");
  });

  const handleClickBoard = (i) => {
    if (!isClickable) {
      setGameStt("Đã có người thắng cuộc, vui lòng chọn ván chơi mới");
      return;
    }

    const historyArr = history.slice(0, stepNumber + 1);
    const current = historyArr[historyArr.length - 1];
    const squares = current.squares.slice();

    if (
      squares[i] |
      (xIsNext & (isCurrPlayer === "O")) |
      (!xIsNext & (isCurrPlayer === "X"))
    ) {
      return;
    }
    console.log("req");
    socket.emit(REQUEST_MOVE, {
      roomId: roomId,
      // userId: auth.authenState.userInfo._id,
      xIsNext: xIsNext,
      location: i,
      player: isCurrPlayer,
    });
  };

  socket.on(ACCEPT_MOVE, (data) => {
    setLatestLocation(data.location);
  });

  // const current = history[stepNumber];

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
              {gameStt}
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                {game ? (
                  <Board
                    squares={history[stepNumber].squares}
                    onClick={(i) => handleClickBoard(i)}
                    currSquare={history[stepNumber].location}
                    winningLine={winningLine}
                  />
                ) : null}

                {/* <Board
                  squares={current.squares}
                  onClick={(i) => handleClickBoard(i)}
                  currSquare={current.location}
                  winningLine={winningLine}
                /> */}
              </Box>
            </Grid>
          </Grid>
          {!roomInfo.isPlaying && isCurrPlayer ? (
            <Grid container className={classes.paper} justify="center">
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOnClickReady}
                >
                  READY
                </Button>
              </Grid>
            </Grid>
          ) : null}

          <Grid container className={classes.paper} justify="center">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                // onClick={handleGiveIn}
              >
                Give in
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
                {renderReadyStatus("X", roomInfo.xPlayerReady)}
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
                {renderReadyStatus("O", roomInfo.oPlayerReady)}
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
