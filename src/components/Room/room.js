import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "./useStyle";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import {
  apiLoadLatestGameInRoomById,
  apiLoadRoomWithPlayerInfoById,
} from "../../service/room-service";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BecomePlayerBtn from "./BecomePlayerBtn/become-player-btn";
import socket from "../../socket.io/socket.io";
import {
  ACCEPT_MOVE,
  BECOME_PLAYER,
  GIVEN_IN_EVENT,
  JOIN_ROOM,
  REQUEST_MOVE,
  START_GAME,
  UPDATE_CURRENT_PLAYER,
  UPDATE_READY_STATUS,
  SAVE_RESULT
} from "../../socket.io/socket-event";
import Board from "../Board/board";
import { BOARD_SIZE } from "../../global/constant";
import { calculateWinner } from "../../service/calculateWinner";
import Chat from "../Chat/chat";

const Room = (props) => {
  const classes = useStyles();
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [game, setGame] = useState(null);
  const [isCurrPlayer, setIsCurrPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthenticationContext);

  // game state
  const [current, setCurrent] = useState({
    squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
    location: null,
    xTurn: true,
  });
  // const [xTurn, setXTurn] = useState(null);
  const [gameStt, setGameStt] = useState(`Bắt đầu X`);
  const [isClickable, setIsClickable] = useState(true);
  const [winningLine, setWinningLine] = useState([]);
  const [newMove, setNewMove] = useState(false);

  // load room info
  useEffect(() => {
    socket.emit(JOIN_ROOM, roomId);

    apiLoadRoomWithPlayerInfoById(roomId)
      .then((res) => {
        console.log(res.data);
        setRoomInfo(res.data);

        if (auth.authenState.userInfo._id === res.data.xCurrentPlayer) {
          setIsCurrPlayer("X");
        } else if (auth.authenState.userInfo._id === res.data.oCurrentPlayer) {
          setIsCurrPlayer("O");
        }

        //load game info if room is playing
        if (res.data.isPlaying) {
          apiLoadLatestGameInRoomById(roomId)
            .then((resGame) => {
              // setXTurn(resGame.data.xTurn);

              const history = { ...current };
              for (let item of resGame.data.history) {
                history.squares[item.location] = item.player;
              }
              history.location = resGame.data.history
                ? resGame.data.history[resGame.data.history.length - 1].location
                : null;
              history.xTurn = resGame.data.xTurn;

              setGameStt(
                resGame.data.history.length === 0
                  ? "Bắt đầu X"
                  : `Lượt kế tiếp ${resGame.data.xTurn ? "X" : "O"}`
              );
              setCurrent(history);
              setGame(resGame.data);
            })
            .catch((err) => console.log(err));
        }

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [roomId]);

  useEffect(() => {
    if (roomInfo) {
      socket.on(UPDATE_CURRENT_PLAYER, (data) => {
        if (data.player === "X") {
          const newRoomInfo = {
            ...roomInfo,
            xCurrentPlayer: data.user._id,
            xPlayerUsername: data.user.username,
            xPlayerReady: false,
          };
          setRoomInfo(newRoomInfo);
          if (auth.authenState.userInfo._id === data.user._id) {
            setIsCurrPlayer("X");
          }
        } else if (data.player === "O") {
          const newRoomInfo = {
            ...roomInfo,
            oCurrentPlayer: data.user._id,
            oPlayerUsername: data.user.username,
            oPlayerReady: false,
          };
          setRoomInfo(newRoomInfo);
          if (auth.authenState.userInfo._id === data.user._id) {
            setIsCurrPlayer("O");
          }
        }
        console.log("data", data);
        console.log("update curr p;ayer", roomInfo);
      });
    }
  }, [roomInfo?._id]);

  useEffect(() => {
    if (roomInfo) {
      socket.on(UPDATE_READY_STATUS, (data) => {
        // console.log(data);
        const newRoomInfo = { ...data };
        delete newRoomInfo.player;
        if (data.player === "X") {
          setRoomInfo(newRoomInfo);
        } else if (data.player === "O") {
          setRoomInfo(newRoomInfo);
        }
      });
    }
  }, [roomInfo?._id]);

  useEffect(() => {
    socket.on(ACCEPT_MOVE, (data) => {
      const history = { ...current };
      history.squares[data.newHistory.location] = data.newHistory.player;
      history.location = data.newHistory.location;
      history.xTurn = data.newHistory.xTurn;

      checkWinner(history.squares, history.location, history.xTurn, {...game});

    });
  }, [game]);

  const checkWinner = (squares, location, xTurn, game) => {
    const checkedResult = calculateWinner(squares, location);
    const { winner, line, draw } = checkedResult;
    console.log("id", game);
    if (winner) {
      setGameStt(`${winner} thắng`);
      setIsClickable(false);
      setWinningLine(line);
      socket.emit(SAVE_RESULT, {
        gameId: game._id,
        winningLine: line,
        isFinish: true,
        winner: winner
      });
    } else {
      if (draw) {
        setGameStt(`Hoà`);
        setIsClickable(false);
        socket.emit(SAVE_RESULT, {
          gameId: game._id,
          isFinish: true,
          winner: "none"
        });
      } else {
        setCurrent({ squares: squares, location: location, xTurn: xTurn });
        setGameStt(`Lượt kế tiếp ${!xTurn ? "O" : "X"}`);
      }
    }
  };

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
        username: auth.authenState.userInfo.username,
      },
      player: player,
      roomId: roomId,
    };
    socket.emit(BECOME_PLAYER, sendData);
  };

  const handleOnClickReady = () => {
    if (isCurrPlayer) {
        let sendData = {...roomInfo};
        sendData.player = isCurrPlayer;
        sendData.xPlayerReady = isCurrPlayer === "X" ? !roomInfo.xPlayerReady : roomInfo.xPlayerReady
        sendData.oPlayerReady = isCurrPlayer === "O" ? !roomInfo.oPlayerReady : roomInfo.oPlayerReady
        sendData.xCurrentPlayer = roomInfo.xCurrentPlayer
        sendData.oCurrentPlayer = roomInfo.oCurrentPlayer

        socket.emit(UPDATE_READY_STATUS, sendData);
    }
};

  socket.on(START_GAME, (game) => {
    setRoomInfo({
      ...roomInfo,
      oPlayerReady: false,
      xPlayerReady: false,
      isPlaying: true,
    });

    setCurrent({
      squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
      location: null,
      xTurn: true,
    });
    setGameStt("Bắt đầu X");
    setGame(game);
    console.log("start", game);
  });

  socket.on(GIVEN_IN_EVENT, (data) => {
    setIsClickable(false);
    if (isCurrPlayer === data.winner)
      setGameStt(`Bạn đã thắng do đối thủ xin thua`);
    else setGameStt(`Bạn đã xin thua`);
  });

  const handleGiveIn = () => {
    if (
      !isClickable ||
      current.xTurn & (isCurrPlayer === "O") ||
      !current.xTurn & (isCurrPlayer === "X")
    ) {
      return;
    }

    socket.emit(GIVEN_IN_EVENT, {
      winner: isCurrPlayer === "X" ? "O" : "X",
      roomId,
    });
  };

  const handleClickBoard = (i) => {
    if (!isCurrPlayer) {
      return;
    }

    if (!isClickable) {
      setGameStt("Đã có người thắng cuộc, vui lòng chọn ván chơi mới");
      return;
    }

    if (
      current.squares[i] |
      (current.xTurn & (isCurrPlayer === "O")) |
      (!current.xTurn & (isCurrPlayer === "X"))
    ) {
      return;
    }

    socket.emit(REQUEST_MOVE, {
      roomId: roomId,
      gameId: game._id,
      newHistory: {
        player: isCurrPlayer,
        location: i,
        xTurn: !current.xTurn,
      },
    });
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Grid container>
            {/* <Grid item xs={12}>
              <PlaySound />
            </Grid> */}
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
              {roomInfo.isPlaying ? gameStt : null}
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                {game ? (
                  <Board
                    squares={current.squares}
                    onClick={(i) => handleClickBoard(i)}
                    currSquare={current.location}
                    winningLine={winningLine}
                  />
                ) : null}
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
                variant="contained"
                color="secondary"
                onClick={handleGiveIn}
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
                    roomInfo.xCurrentPlayer
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
                    roomInfo.oCurrentPlayer
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
              {game && <Chat id={roomId} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Room;
