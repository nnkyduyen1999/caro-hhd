import { Container, List, ListItem, ListItemText } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import { makeStyles } from "@material-ui/core/styles";

const OnlineUsers = (props) => {
  const classes = useStyles();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authenticationContext = useContext(AuthenticationContext);

  socket.on("update-online-users", (users) => {
    console.log(users);
    setOnlineUsers([...users]);
  });

  if (authenticationContext.authenState.userInfo) {
    socket.emit("new-connection", authenticationContext.authenState.userInfo);
  }

  const renderOnlineUsers = (users) => {
    console.log("hi", onlineUsers);
    return users.map((user) => (
      <ListItem key={user._id}>
        <ListItemText primary={user.username} />
      </ListItem>
    ));
  };

  return (
    <Container className={classes.root}>
      <div>Online Users</div>
      <List dense className={classes.list}>
        {renderOnlineUsers(onlineUsers)}
      </List>
    </Container>
  );
};

export default OnlineUsers;

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
