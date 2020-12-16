import React, { useState } from "react";
import { BOARD_SIZE } from "../../global/constant";
import Board from "../Board/board";
import PlaySound from "../PlaySound/play-sound";
import Chat from "../Chat/chat";
import { Grid, Paper, Container, Box, Avatar, Button } from "@material-ui/core";
import { useStyles } from "../Home/useStyle";

const Game = (props) => {
  const classes = useStyles();

  const [history, setHistory] = useState([
    { squares: Array(BOARD_SIZE * BOARD_SIZE).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    console.log(i);
    const historyArr = history.slice(0, stepNumber + 1);
    const current = historyArr[historyArr.length - 1];
    const squares = current.squares.slice();

    //TODO: check result
    if (squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setHistory(
      historyArr.concat([
        {
          squares: squares,
          location: i,
        },
      ])
    );
    setStepNumber(historyArr.length);
    setXIsNext(!xIsNext);
    console.log(historyArr);
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
              <Box>Which turn</Box>
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
              <Grid item xs={3}>
                <Box textAlign="center">X</Box>
              </Grid>
              <Grid item xs={3}>
                <Box textAlign="center">Goals</Box>
              </Grid>
              <Grid item xs={3}>
                <Box textAlign="center">O</Box>
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
                <Chat />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Game;
