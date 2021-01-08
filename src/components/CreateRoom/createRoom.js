import React, { useState, useContext } from "react";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Button } from "@material-ui/core";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import socket from "../../socket.io/socket.io";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const CreateRoom = (props) => {
  const [newRoom, setNewRoom] = useState(null);
  const authenticationContext = useContext(AuthenticationContext);
  const handleClick = () => {
    console.log("click create please wait");
    
    // socket.emit("createRoom", authenticationContext.authenState.userInfo);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
   
    <div>
     <Button
      variant="outlined"
      color="primary"
      endIcon={<SportsEsportsIcon />}
      onClick={handleClickOpen}
      style={{marginTop: 20}}
    >
      Create Room
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Setting Your Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Room password"
          type="text"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="timeStep"
          label="Time for each step"
          type="number"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleClose} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default CreateRoom;
