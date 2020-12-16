import {
  Grid,
  Paper,
  Tabs,
  Tab,
  Button,
  Hidden,
  Container,
} from "@material-ui/core";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import GroupIcon from "@material-ui/icons/Group";
import React, { useState } from "react";
import { useStyles } from "./useStyle";
import TabPanel from "./tabpanel";
import OnlineUsers from "../OnlineUsers/online-users";
import FinishedBoards from "../FinishedBoards/finishedBoards";

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper square>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab
                icon={<GroupIcon label="active" {...a11yProps(0)} />}
                label="ACTIVE PLAYERS"
              />
              <Tab
                icon={<AccessAlarmsIcon label="recents" {...a11yProps(1)} />}
                label="RECENTS"
              />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <OnlineUsers />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FinishedBoards />
          </TabPanel>
        </Grid>
        <Grid item xs={6} spacing={3}>
          <Grid container>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SportsEsportsIcon />}
              >
                Chơi ngay
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={9}>
              <Hidden smDown>
              <img src="/img/caro.svg" className={classes.image} alt="Img" />
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
