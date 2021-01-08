import { Grid, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "./useStyle";
import OnlineUsers from "../OnlineUsers/online-users";
import Matching from "../Matching/matching";
import JoinRoom from "../JoinRoom/join-room";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import { apiGetOnlineUsers } from "../../service/user-service";

const Home = (props) => {
  const classes = useStyles();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loadOnlineUsers, setLoadOnlineUsers] = useState(true);
  const authenticationContext = useContext(AuthenticationContext);

  const loadAllOnlineUsers = () => {
    apiGetOnlineUsers()
      .then((res) => {
        setOnlineUsers(res.data);
        setLoadOnlineUsers(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loadOnlineUsers) {
      loadAllOnlineUsers();
    }
  }, [loadOnlineUsers]);

  socket.on("update-online-users", () => {
    setLoadOnlineUsers(true)
  });

  useEffect(() => {
    socket.emit(
      "new-connection",
      authenticationContext.authenState.userInfo._id
    );
  }, [authenticationContext.authenState.userInfo]);

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <OnlineUsers data={onlineUsers} />
        </Grid>
        <Grid item xs={8} spacing={4}>
          <Grid container spacing={1}>
            <JoinRoom />
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Matching />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={9}>
              {/* <Hidden smDown>
                <img src="/img/caro.svg" className={classes.image} alt="Img" />
              </Hidden> */}
              {/* <ListRoom /> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
