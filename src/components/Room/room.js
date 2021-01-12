import {Avatar, Box, Button, CircularProgress, Container, Grid, IconButton} from "@material-ui/core";
import {useStyles} from "./useStyle";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {AuthenticationContext} from "../../providers/authenticationProvider";
import {apiLoadLatestGameInRoomById, apiLoadRoomWithPlayerInfoById,} from "../../service/room-service";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import BecomePlayerBtn from "./BecomePlayerBtn/become-player-btn";
import socket from "../../socket.io/socket.io";
import {
    ACCEPT_MOVE,
    BECOME_PLAYER, GIVEN_IN_EVENT,
    JOIN_ROOM,
    REQUEST_MOVE,
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
    const {roomId} = useParams();
    const [roomInfo, setRoomInfo] = useState(null);
    const [game, setGame] = useState(null);
    const [isCurrPlayer, setIsCurrPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const auth = useContext(AuthenticationContext);

    // game state
    const [current, setCurrent] = useState({
        squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
        location: null,
    });
    const [xIsNext, setXIsNext] = useState(true);
    const [gameStt, setGameStt] = useState(`Bắt đầu X`);
    const [isClickable, setIsClickable] = useState(true);
    const [winningLine, setWinningLine] = useState([]);

    socket.emit(JOIN_ROOM, roomId);

    // load room info
    useEffect(() => {
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
                            setXIsNext(resGame.data.xIsNext);
                            setGameStt(
                                resGame.data.stepNumber === 0
                                    ? "Bắt đầu X"
                                    : `Lượt kế tiếp ${resGame.data.xIsNext ? "X" : "O"}`
                            );

                            const history = {...current};
                            for (let item of resGame.data.game.history) {
                                history.squares[item.location] = item.player;
                            }
                            history.location = resGame.data.game.history
                                ? resGame.data.game.history[
                                resGame.data.game.history.length - 1
                                    ].location
                                : null;

                            setCurrent(history);
                            setGame(resGame.data.game);
                        })
                        .catch((err) => console.log(err));
                }

                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

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
            };
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

        setXIsNext(true);
        setCurrent({
            squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
            location: null,
        });
        setGameStt("Bắt đầu X");
        setGame(game);
    });

    socket.on(GIVEN_IN_EVENT, (data) => {
        setIsClickable(false);
        if (isCurrPlayer === data.winner) setGameStt(`Bạn đã thắng do đối thủ xin thua`);
        else setGameStt(`Bạn đã xin thua`);
    });

    const handleGiveIn = () => {
        if (
            !isClickable ||
            xIsNext & (isCurrPlayer === "O") ||
            !xIsNext & (isCurrPlayer === "X")
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
            (xIsNext & (isCurrPlayer === "O")) |
            (!xIsNext & (isCurrPlayer === "X"))
        ) {
            return;
        }

        socket.emit(REQUEST_MOVE, {
            roomId: roomId,
            gameId: game._id,
            newHistory: {
                player: isCurrPlayer,
                location: i,
            },
        });
    };

    socket.on(ACCEPT_MOVE, (data) => {
        const history = {...current};
        history.squares[data.newHistory.location] = data.newHistory.player;
        history.location = data.newHistory.location;
        setCurrent(history);

        const checkedResult = calculateWinner(current.squares, current.location);
        console.log(checkedResult);
        const {winner, line, draw} = checkedResult;
        if (winner) {
            setGameStt(`${winner} thắng`);
            setIsClickable(false);
            setWinningLine(line);
        } else {
            if (draw) {
                setGameStt(`Hoà`);
                setIsClickable(false);
            } else {
                setGameStt(`Lượt kế tiếp ${xIsNext ? "O" : "X"}`);
                setXIsNext(!xIsNext);
            }
        }
    });

    return isLoading ? (
        <CircularProgress/>
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
                                <ExitToAppIcon/>
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
                            {
                                game && <Chat id={roomId} />
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Room;
