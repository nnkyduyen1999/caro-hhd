import React from 'react';
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


const ChatItem = ({message, isOwn, senderName}) => {
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
    );
};

const useStyles = makeStyles(theme => ({
    container: {},
    message: {},
    inline: {
        display: 'inline',
    },
    isOwn: {
        color: '#f8df4f'
    }
}));

export default ChatItem;
