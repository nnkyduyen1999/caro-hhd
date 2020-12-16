import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import { makeStyles } from "@material-ui/core/styles";
import {StyledBadge} from "./styledBadge";

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

  const handleClickUser = (id) => {
    console.log(id);
  }

  const renderOnlineUsers = (users) => {
    console.log("hi", onlineUsers);
    return users.map((user) => (
      <ListItem key={user._id} dense button onClick={() => handleClickUser(user._id)}>
        <ListItemAvatar>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={`Avatar n°${user._id + 1}`}
              // src={`/static/images/avatar/${user._id + 1}.jpg`}
              src="https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg"
            />
          </StyledBadge>
        </ListItemAvatar>
        {/* <ListItemText primary={user.username} /> */}
        <ListItemText primary="Name" />
      </ListItem>
    ));
  };

  return (
    <div className={classes.root}>
      <List dense className={classes.list}>
        {renderOnlineUsers([0, 1, 2])}
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
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
}));
