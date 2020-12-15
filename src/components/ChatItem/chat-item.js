import React, {useContext} from 'react';
import {Grid, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AuthenticationContext} from "../../providers/authenticationProvider";


const ChatItem = ({message, isOwn}) => {
    const classes = useStyles();
    const {authenState} = useContext(AuthenticationContext);

    return (
        isOwn ?
            <Grid container className={classes.myMessage}>
                <Typography>
                    {message}
                </Typography>
            </Grid>
            :
            <Grid container className={classes.receivedMessage}>
                <Typography>
                    {message}
                </Typography>
            </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    myMessage: {
        flex: 1,
        margin: theme.spacing(1),
        justifyContent: 'flex-end',
    },
    receivedMessage: {
        flex: 1,
    },
    message: {
        margin: theme.spacing(1),
    }
}));

export default ChatItem;
