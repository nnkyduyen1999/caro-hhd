import { Container, Grid, Box, Avatar, ListItem, ListItemText } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGetGameHistoryDetail } from "../../service/game-service";
import Board from "../Board/board";
import Loading from "../Loading/loading";
import { useStyles } from "./useStyles";

const GameHistory = (props) => {
  const classes = useStyles();
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [current, setCurrent] = useState(null);
  const [winningLine, setWinningLine] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  const loadGameInfo = () => {
    apiGetGameHistoryDetail(gameId)
      .then((res) => {
        setGame(res.data);
        setCurrent(res.data.history[0]);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadGameInfo();
  }, [gameId]);

  const handleClickBoard = (i) => {};

  const onClickStep = (i) => {
    setCurrent({...game.history[i]})
    if (i === game.history.length - 1) {
        setWinningLine(game.winningLine)
    } else {
        setWinningLine(null)
    }
  }

  const renderSteps = (stepData) => {
    return stepData.map((item, index) => (
      <ListItem
        key={`step-${index}`}
        dense
        button
        onClick={() => onClickStep(index)}
      >
        <ListItemText primary={`Step ${index + 1}`} />
      </ListItem>
    ));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        {/* <Grid item xs={1}>
                  <Grid container>
                      <Grid item xs={12}>
            <PlaySound />
          </Grid>
                      <Grid item xs={12}>
                          <IconButton color="secondary" aria-label="exit">
                              <ExitToAppIcon/>
                          </IconButton>
                      </Grid>
                  </Grid>
              </Grid> */}
              <Grid item xs={1}>
                  {renderSteps(game.history)}
              </Grid>

        <Grid item xs={6}>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              {game.winner === "Draw" ? game.winner : `${game.winner} win`}
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <Board
                  squares={current.squares}
                  onClick={(i) => handleClickBoard(i)}
                  currSquare={current.location}
                  winningLine={winningLine}
                />
              </Box>
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

          <Grid container justify="space-around" className={classes.paper}>
            <Grid item xs={3}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt="Remy Sharp"
                  src="https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
                  className={classes.large}
                />
              </Box>
              <Box className={classes.userName}>
                {game.xPlayerUsername}
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
              </Box>
              <Box className={classes.userName}>
                {game.oPlayerUsername}
              </Box>
            </Grid>
          </Grid>
          {/* <Grid container justify="center">
                      <Grid item xs={8}>
                          {game && <Chat id={roomId} messages={messages} sendMessage={sendMessage}/>}
                      </Grid>
                  </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default GameHistory;
