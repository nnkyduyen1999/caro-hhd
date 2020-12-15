import React from "react";
import { Grid, Paper, Container, Box, Avatar, Button } from "@material-ui/core";
import { useStyles } from "../Home/useStyle";

const Games = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <Grid container>
            <Grid item xs={12}>
              <Paper>Volumn</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>Thoat</Paper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Box>Which turn</Box>
            </Grid>
          </Grid>
          <Grid container className={classes.paper}>
            <Grid item xs={12}>
              <Paper>Board</Paper>
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

        <Grid item xs={6} spacing={3}>
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
              <Grid item xs={4}>
                <Paper>Chat</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Games;
