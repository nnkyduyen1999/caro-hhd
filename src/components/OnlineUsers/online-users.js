import { List, ListItem, ListItemText } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import { makeStyles } from "@material-ui/core/styles";

const OnlineUsers = (props) => {
  const classes = useStyles();
  const authenticationContext = useContext(AuthenticationContext);

  socket.on("update-online-users", (users) => {
    console.log("update", users);
    props.setOnlineUsers([...users]);
  });

  useEffect(() => {
    socket.emit("new-connection", authenticationContext.authenState.userInfo);
  }, [authenticationContext.authenState.userInfo]);

  const renderOnlineUsers = (users) => {
    console.log("hi", users);
    return users.map((user) => (
      <ListItem key={user._id}>
        <ListItemText primary={user.username} />
      </ListItem>
    ));
  };

  return (
    <div className={classes.root}>
      <div>Online Users</div>
      <List dense className={classes.list}>
        {renderOnlineUsers(props.onlineUsers)}
      </List>
    </div>
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
  },
}));
