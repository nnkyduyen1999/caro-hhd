import React, {useContext} from 'react';
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {AuthenticationContext} from "../../../providers/authenticationProvider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const ChatItem = ({message, username, isOwn, senderName}) => {
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start" dense={true} style={{paddingTop: 0, paddingBottom: 0}}>
            <ListItemText
                secondary={
                    isOwn ?
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color={"textPrimary"}
                                style={{color: '#f8df4f'}}
                            >
                                {`${senderName}: ${message}`}
                            </Typography>
                        :
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color={"textPrimary"}
                        >
                            {`${senderName}: ${message}`}
                        </Typography>
                }
            />
        </ListItem>
        // <Grid container className={classes.container}>
        //     <Typography noWrap={false} className={classes.message}>
        //         {message}
        //     </Typography>
        // </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        // margin: theme.spacing(1),
    },
    message: {},
    inline: {
        display: 'inline',
    },
    isOwn: {
        color: '#f8df4f'
    }
}));

export default ChatItem;
