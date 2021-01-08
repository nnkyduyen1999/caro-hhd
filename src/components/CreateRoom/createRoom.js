import React, { useState, useContext } from "react";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Button } from "@material-ui/core";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";

const CreateRoom = (props) => {
  const [password, setPassword] = useState(null);
  const [timeStep, setTimeStep] = useState(null);
  const [waitingRoom, setWaitingRoom] = useState(null);
  const [open, setOpen] = useState(false);

  const authenticationContext = useContext(AuthenticationContext);

  const handleClickCreate = (password, timeStep) => {
    const socketData = {
      password: password,
      timeStep: timeStep,
      userId: authenticationContext.authenState.userInfo._id,
    };
    setOpen(false);
    socket.emit("createRoom", socketData);
    socket.on("inWaiting", (dataSocket) => {
      setWaitingRoom(dataSocket);
    });
  };

  if (waitingRoom) {
    return (
      <Redirect
        to={{
          pathname: `/game/${waitingRoom._id}`,
          state: { roomInfo: waitingRoom },
        }}
      />
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeTextField = (e) => {
    switch (e.target.name) {
      case "password":
        setPassword(e.target.value);
        break;
      case "timeStep":
        setTimeStep(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        endIcon={<SportsEsportsIcon />}
        onClick={handleClickOpen}
        style={{ marginTop: 20 }}
      >
        Create Room
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Setting Your Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            name="password"
            label="Room password"
            type="text"
            onChange={handleChangeTextField}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="timeStep"
            name="timeStep"
            label="Time for each step"
            type="number"
            onChange={handleChangeTextField}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleClickCreate(password, timeStep)}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateRoom;
