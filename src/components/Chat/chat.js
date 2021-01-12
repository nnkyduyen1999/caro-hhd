import React, {useEffect} from "react";
import useChat from "./useChat";
import {Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ChatItem from "./ChatItem/chat-item";
import SendIcon from '@material-ui/icons/Send';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";

const Chat = ({id, disableSend}) => {
    const classes = useStyles();
    const {messages, sendMessage} = useChat(id); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

    useEffect(() => {
        const element = document.getElementById("bottom");
        element.scrollTop = element.scrollHeight;
    }, [messages])

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);

    };

    const handleSendMessage = () => {
        if (newMessage !== '') {
            sendMessage(newMessage);
            setNewMessage("");
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Grid container className={classes.container}>
            <CssBaseline/>
            <Grid item md={12}>
                <List className={classes.conversationContainer} id={'bottom'}>
                    {messages.map((message, i) => (
                        <ChatItem key={i} message={message.body} isOwn={message.ownedByCurrentUser}
                                  senderName={message.senderName}/>
                    ))}
                </List>
            </Grid>
            {!disableSend &&
            <Grid item md={12}>
                <Paper className={classes.inputContainer}>
                    <InputBase
                        className={classes.input}
                        placeholder="Input message..."
                        onChange={handleNewMessageChange}
                        value={newMessage}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton className={classes.iconButton} onClick={handleSendMessage}>
                        <SendIcon/>
                    </IconButton>
                </Paper>
            </Grid>
            }
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        width: '360',
        border: "0.5px solid",
    },
    inputContainer: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '200',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    conversationContainer: {
        height: 300,
        width: '100%',
        position: 'relative',
        overflowY: 'auto',
    },

}));

export default Chat;
