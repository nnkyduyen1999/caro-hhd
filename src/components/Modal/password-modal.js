import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '30%'
    },
    buttonGroup: {
        display: 'flex',
        marginTop: theme.spacing(2),
        justifyContent: 'flex-end',
    }
}));

export default function PasswordModal() {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoinRoom = () => {
        if(value === '') {
            setError(true);
            setErrorMessage('Vui lòng nhập mật khẩu room')
        }
    }

    const handleChange = (e) => {
        setError(false);
        setErrorMessage(null);
        setValue(e.target.value);
    }

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                react-spring
            </button>
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.paper}>
                    <h2>Nhập room password</h2>
                    <TextField
                        error={error}
                        helperText={errorMessage}
                        variant="outlined"
                        margin="dense"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        // value={value}
                        onChange={handleChange}
                    />
                    <div className={classes.buttonGroup}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpen(false)}
                            style={{marginRight: 20}}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleJoinRoom}
                        >
                            Join room
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
