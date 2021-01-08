import { Grid, Container } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "./useStyle";
import OnlineUsers from "../OnlineUsers/online-users";
import Matching from "../Matching/matching";
import JoinRoom from "../JoinRoom/join-room";
import Header from "../Header/header";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import { apiGetOnlineUsers } from "../../service/user-service";
import { apiGetAllRooms } from "../../service/room-service";
import ListRoom from "../ListRoom/list-room";

const Home = (props) => {
  const classes = useStyles();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loadOnlineUsers, setLoadOnlineUsers] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [loadRooms, setLoadRooms] = useState(true);
  const authenticationContext = useContext(AuthenticationContext);

  const handleloadAllOnlineUsers = () => {
    apiGetOnlineUsers()
      .then((res) => {
        setOnlineUsers(res.data);
        setLoadOnlineUsers(false);
      })
      .catch((err) => console.log(err));
  };

  const handleloadAllRooms = () => {
    apiGetAllRooms()
      .then((res) => {
        setRooms(res.data);
        setLoadRooms(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (loadOnlineUsers) {
      handleloadAllOnlineUsers();
    }
  }, [loadOnlineUsers]);

  useEffect(() => {
    if (loadRooms) {
      handleloadAllRooms();
    }
  }, [loadRooms]);

  socket.on("update-online-users", () => {
    setLoadOnlineUsers(true);
  });

  useEffect(() => {
    socket.emit(
      "new-connection",
      authenticationContext.authenState.userInfo._id
    );
  }, [authenticationContext.authenState.userInfo]);

  return (
    <>
    <Header homeActive={true}/>
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <OnlineUsers data={onlineUsers} />
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={1}>
            <JoinRoom />
          </Grid>
          <Grid>
            <Grid item xs={4}>
              <Matching />
            </Grid>
          </Grid>
          <Grid>
            <ListRoom data={rooms} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Home;
