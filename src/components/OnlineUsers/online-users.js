import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StyledBadge } from "./styledBadge";

const OnlineUsers = (props) => {
  const classes = useStyles();
  
  const handleClickUser = (id) => {
    console.log(id);
  };

  const renderOnlineUsers = (users) => {
    return users.map((user) => (
      <ListItem
        key={user._id}
        dense
        button
        onClick={() => handleClickUser(user._id)}
      >
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
        <ListItemText primary={user.username} />
      </ListItem>
    ));
  };

  return (
    <div className={classes.root}>
      <List dense className={classes.list}>
        {renderOnlineUsers(props.data)}
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
