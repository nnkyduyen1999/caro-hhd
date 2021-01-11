import React, {useState} from "react";
import {Button, Grid, Paper, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {apiGetRoomById} from "../../service/room-service";
import PasswordModal from "../Modal/password-modal";

const JoinRoom = (props) => {
    const classes = useStyles();
    const [room, setRoom] = useState({});
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory()

    const handleClick = () => {
        if (value === '') {
            setErrorMessage("Vui lòng nhập room id");
        } else (
            apiGetRoomById(value).then(res => {
                setRoom(res.data.room);
                if(!res.data.room.password) {
                    history.push(`/room/${res.data.room._id}`)
                } else {
                    setOpen(true);
                }
            }).catch(err => {
                setErrorMessage('room not found')
            })
        )

    };

    const handleChange = (e) => {
        setErrorMessage('');
        setValue(e.target.value);
    }

    // socket.on("successfullyMatched", (data) => {
    //     socket.emit('joinRoom', data._id)
    //     setCreatedRoom(data)
    // });
    //
    // if (createdRoom) {
    //     return <Redirect to={{pathname: `/game/${createdRoom._id}`, state: {roomInfo: createdRoom}}}/>;
    // }

    return (
        <>
            <Grid item md={8}>
                <Paper className={classes.inputContainer}>
                    <InputBase
                        className={classes.input}
                        placeholder="nhập room id..."
                        onChange={handleChange}
                    />
                </Paper>
                <Typography className={classes.error}>{errorMessage}</Typography>
            </Grid>
            <Grid item md={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                >
                    Join room
                </Button>
            </Grid>
            <PasswordModal open={open} roomId={room._id}
                           handleClose={() => setOpen(true)}
                           handleOpen={() => setOpen(false)}
                           roomPass={room.password}/>
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
    error: {
        color: 'red',
        marginTop: theme.spacing(0.5),
    }
}));


export default JoinRoom;
