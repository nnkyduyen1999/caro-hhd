import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const user = {
  avatar:
    "https://images-na.ssl-images-amazon.com/images/I/71FcdrSeKlL._AC_SL1001_.jpg",
  timezone: "GTM-7",
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, info, ...rest }) => {
  const classes = useStyles();
    const time = new Date(info.createTime);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={user.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {info.username}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${info.winCount} win - ${info.loseCount} lose`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${time.toUTCString()}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
