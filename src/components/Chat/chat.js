import React from "react";
import useChat from "./useChat";
import {Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ChatItem from "../ChatItem/chat-item";
import SendIcon from '@material-ui/icons/Send';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const Chat = ({id}) => {
    const classes = useStyles();
    // const { roomId } = props.match.params; // Gets roomId from URL
    const roomId = id || "5fd86ef67a1a712658cb5fac";
    const {messages, sendMessage} = useChat(roomId); // Creates a websocket and manages messaging
    const [newMessage, setNewMessage] = React.useState(""); // Message to be sent


    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);

    };

    const handleSendMessage = () => {
        if (newMessage !== '') {
            sendMessage(newMessage);
            setNewMessage("");
            const obj = document.getElementById("hihi");
            obj.scrollIntoView();
            console.log(obj);
        }
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Grid container className={classes.container}>
            <CssBaseline/>
            <Grid item md={12}>
                <List className={classes.conversationContainer} id="list-messages">
                    {messages.map((message, i) => (
                        <ChatItem key={i} message={message.body} isOwn={message.ownedByCurrentUser} senderName={message.senderName}/>
                    ))}
                    <ListItem id={'hihi'}/>
                </List>
            </Grid>
            <Grid item md={12}>
                <Paper className={classes.inputContainer}>
                    <InputBase
                        className={classes.input}
                        placeholder="type a message..."
                        onChange={handleNewMessageChange}
                        value={newMessage}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton className={classes.iconButton} onClick={handleSendMessage}>
                        <SendIcon/>
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
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
        maxWidth: 360,
        // backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'scroll',
        maxHeight: 300,
    },

}));

export default Chat;
