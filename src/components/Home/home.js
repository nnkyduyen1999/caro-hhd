import { Grid, Paper } from "@material-ui/core";
import React from "react";
import { useStyles } from "./useStyle";

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>Tab</Paper>
        </Grid>
        <Grid item xs={6} spacing={3}>
          <Paper className={classes.paper}>
              <Grid container>
              <Grid item xs={6}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
              </Grid>
              <Grid container>
              <Grid item xs={12}>
              <Paper className={classes.paper}>xs=3</Paper>
            </Grid>
              </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
