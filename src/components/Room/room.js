import {Avatar, Box, Button, CircularProgress, Container, Grid,} from "@material-ui/core";
import {useStyles} from "./useStyle";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AuthenticationContext} from "../../providers/authenticationProvider";
import {apiLoadLatestGameInRoomById, apiLoadRoomWithPlayerInfoById,} from "../../service/room-service";
import ExitRoom from "../ExitRoom/exitRoom";
import BecomePlayerBtn from "./BecomePlayerBtn/become-player-btn";
import socket from "../../socket.io/socket.io";
import {
  ACCEPT_MOVE,
  BECOME_PLAYER,
  GIVEN_IN_EVENT,
  JOIN_ROOM,
  NEW_CHAT_MESSAGE_EVENT,
  REQUEST_MOVE,
  SAVE_RESULT,
  SAVE_USER_SUCCESS,
  START_GAME,
  UPDATE_CURRENT_PLAYER,
  UPDATE_READY_STATUS,
} from "../../socket.io/socket-event";
import Board from "../Board/board";
import {BOARD_SIZE} from "../../global/constant";
import {calculateWinner} from "../../service/calculateWinner";
import Chat from "../Chat/chat";

const Room = (props) => {
  const classes = useStyles();
  const { roomId } = useParams();
  const [roomInfo, setRoomInfo] = useState(null);
  const [game, setGame] = useState(null);
  const [isCurrPlayer, setIsCurrPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useContext(AuthenticationContext);
  const [xTrophy, setXTrophy] = useState(0);
  const [oTrophy, setOTrophy] = useState(0);

  // game state
  const [current, setCurrent] = useState({
    squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
    location: null,
    xTurn: true,
  });
  const [gameStt, setGameStt] = useState(`Bắt đầu X`);
  const [isClickable, setIsClickable] = useState(true);
  const [winningLine, setWinningLine] = useState([]);

  //chat state
  const [messages, setMessages] = useState([]); // Sent and received messages

  // load room info
  useEffect(() => {
    socket.emit(JOIN_ROOM, roomId);
    socket.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      let incomingMessage = { ...message };
      delete incomingMessage.roomId;
      setMessages((messages) => [...messages, incomingMessage]);
    });

    apiLoadRoomWithPlayerInfoById(roomId)
      .then((res) => {
        // console.log("fulinfo", res.data);
        setRoomInfo(res.data);
        setXTrophy(res.data.xPlayerTrophy);
        setOTrophy(res.data.oPlayerTrophy);

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
              // console.log('loggame', resGame.data.history)
              const history = { ...current };
              for (let item of resGame.data.history) {
                history.squares[item.location] = item.player;
              }

              if (resGame.data.history.length === 0) {
                history.location = null;
                setMessages([]);
              } else {
                history.location =
                  resGame.data.history[
                    resGame.data.history.length - 1
                  ].location;
                setMessages(
                  resGame.data.history[resGame.data.history.length - 1].messages
                );
              }
              history.xTurn = resGame.data.xTurn;

              setGameStt(
                resGame.data.history.length === 0
                  ? "Bắt đầu X"
                  : `Lượt kế tiếp ${resGame.data.xTurn ? "X" : "O"}`
              );

              setCurrent(history);
              setGame(resGame.data);
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        } else {
          setIsLoading(false);
        }
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
            xPlayerTrophy: data.user.trophy,
            xPlayerReady: false,
          };
          setRoomInfo(newRoomInfo);
          setXTrophy(newRoomInfo.xPlayerTrophy);
          if (auth.authenState.userInfo._id === data.user._id) {
            setIsCurrPlayer("X");
          }
        } else if (data.player === "O") {
          const newRoomInfo = {
            ...roomInfo,
            oCurrentPlayer: data.user._id,
            oPlayerUsername: data.user.username,
            oPlayerTrophy: data.user.trophy,
            oPlayerReady: false,
          };
          setRoomInfo(newRoomInfo);
          setOTrophy(newRoomInfo.oPlayerTrophy);
          if (auth.authenState.userInfo._id === data.user._id) {
            setIsCurrPlayer("O");
          }
        }
        // console.log("data", data);
        // console.log("update curr player", roomInfo);
      });
    }
  }, [roomInfo?._id]);

  useEffect(() => {
    if (roomInfo) {
      socket.on(UPDATE_READY_STATUS, (data) => {
        // console.log('ready', data);
        const newRoomInfo = { ...data };
        delete newRoomInfo.player;
        setRoomInfo(newRoomInfo);
      });
    }
  }, [roomInfo?._id]);

  useEffect(() => {
    socket.on(ACCEPT_MOVE, (data) => {
      const history = { ...current };
      history.squares[data.newHistory.location] = data.newHistory.player;
      history.location = data.newHistory.location;
      history.xTurn = data.newHistory.xTurn;

      checkWinner(history.squares, history.location, history.xTurn, {
        ...game,
      });
    });
  }, [game]);

  useEffect(() => {
    if (game) {
      socket.on(SAVE_USER_SUCCESS, (data) => {
        //console.log(data);
        if (data.winner === `X`) {
          setXTrophy(data.updatedWinner);
          setOTrophy(data.updatedLoser);
        } else if (data.winner === `O`) {
          setOTrophy(data.updatedWinner);
          setXTrophy(data.updatedLoser);
        }
      });
    }
  }, [game]);

  useEffect(() => {
    // if(roomInfo) {
      socket.on(START_GAME, (data) => {
        // console.log('start game data', data)
        const newRoomInfo = { ...data.roomInfo };
        delete newRoomInfo.player;
        setRoomInfo(newRoomInfo);

        setCurrent({
          squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
          location: null,
          xTurn: true,
        });
        setGameStt("Bắt đầu X");
        setGame(data.game);
        setIsClickable(true);
        setWinningLine([]);
        // console.log("start-game: roomInfo", roomInfo);
        // console.log("start-game: game", game);
      });
    // }
  }, []);

  useEffect(() => {
    socket.on(GIVEN_IN_EVENT, (data) => {
      setIsClickable(false);
      setRoomInfo({ ...roomInfo, isPlaying: false });
      setGameStt(`${data.winner} thắng do đối thủ xin thua`);
    });
  }, [game]);

  const checkWinner = (squares, location, xTurn, game) => {
    const checkedResult = calculateWinner(squares, location);
    const { winner, line, draw } = checkedResult;
    // console.log(game);
    if (winner) {
      setGameStt(`${winner} thắng`);
      setIsClickable(false);
      setWinningLine(line);
      setRoomInfo({ ...roomInfo, isPlaying: false });
      if (isCurrPlayer === winner) {
        // console.log("calling", isCurrPlayer, winner);
        socket.emit(SAVE_RESULT, {
          gameId: game._id,
          winningLine: line,
          winner: winner,
          xPlayer: game.xPlayer,
          oPlayer: game.oPlayer,
          roomId: game.roomId,
        });
      }
    } else {
      if (draw) {
        setGameStt(`Hoà`);
        setIsClickable(false);
        setRoomInfo({ ...roomInfo, isPlaying: false });
        socket.emit(SAVE_RESULT, {
          gameId: game._id,
          winner: "none",
          roomId: game.roomId,
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
      let sendData = { ...roomInfo };
      sendData.player = isCurrPlayer;
      sendData.xPlayerReady =
        isCurrPlayer === "X" ? !roomInfo.xPlayerReady : roomInfo.xPlayerReady;
      sendData.oPlayerReady =
        isCurrPlayer === "O" ? !roomInfo.oPlayerReady : roomInfo.oPlayerReady;
      sendData.xCurrentPlayer = roomInfo.xCurrentPlayer;
      sendData.oCurrentPlayer = roomInfo.oCurrentPlayer;
      socket.emit(UPDATE_READY_STATUS, sendData);
    }
  };

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
      game,
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
        messages: messages,
      },
    });
  };

  const sendMessage = (messageBody) => {
    socket.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: auth.authenState.userInfo._id,
      senderName: auth.authenState.userInfo.username,
      roomId,
    });
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Container className={classes.root}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={8}>
          <Grid container className={classes.paper}>
            <Grid item xs={1}>
              <ExitRoom/>
            </Grid>
            <Grid item xs={10}>
              {game ? gameStt : null}
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

          {roomInfo.isPlaying && <Grid container className={classes.paper} justify="center">
            <Grid item xs={6}>
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleGiveIn}
              >
                Give in
              </Button>
            </Grid>
          </Grid>}
        </Grid>

        <Grid item xs={4} spacing={3}>
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
                  {/* `${} trophies vs ${} trophies` */}
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
          <Grid item xs={12}>
            <Grid
              container
              justify="space-around"
              style={{ textAlign: "center", marginBottom: 10 }}
            >
              <Grid item xs={3} display="flex" justify="center">
                <Box textAlign="center">{xTrophy} trophies</Box>
              </Grid>
              <Grid item xs={3}>
                <Box textAlign="center">
                  {/* `${} trophies vs ${} trophies` */}
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box textAlign="center">{oTrophy} trophies</Box>
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
              {game && (
                <Chat
                  id={roomId}
                  messages={messages}
                  sendMessage={sendMessage}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Room;
