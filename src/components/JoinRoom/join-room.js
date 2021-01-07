import React, {useContext, useState} from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {Redirect} from "react-router-dom";
import {AuthenticationContext} from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";

const JoinRoom = (props) => {
    const classes = useStyles();
    const [createdRoom, setCreatedRoom] = useState(null);
    const authenticationContext = useContext(AuthenticationContext);
    const handleClick = () => {
        console.log("click match please wait");
        socket.emit("matching", authenticationContext.authenState.userInfo);
    };

    socket.on("successfullyMatched", (data) => {
        socket.emit('joinRoom', data._id)
        setCreatedRoom(data)
    });

    if (createdRoom) {
        return <Redirect to={{pathname: `/game/${createdRoom._id}`, state: {roomInfo: createdRoom}}}/>;
    }

    return (
        <>
            <Grid item md={8}>
                <Paper className={classes.inputContainer}>
                    <InputBase
                        className={classes.input}
                        placeholder="nhập room id..."
                        // onChange={handleNewMessageChange}
                        // value={newMessage}
                        // onKeyDown={handleKeyDown}
                    />
                    {/*<IconButton className={classes.iconButton}>*/}
                    {/*  <SendIcon/>*/}
                    {/*</IconButton>*/}
                </Paper>
            </Grid>
            <Grid item md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    // endIcon={<SportsEsportsIcon />}
                    // onClick={handleClick}
                >
                    Join room
                </Button>
            </Grid>
        </>

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
        overflowY: 'auto',
        maxHeight: 300,
    },
}));


export default JoinRoom;
