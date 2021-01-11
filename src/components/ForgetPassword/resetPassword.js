import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        HHD Team
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [msg, setMsg] = useState(null);
  const [isErr, setIsErr] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (confirmPassword !== newPassword) {
      setIsErr(true);
      setMsg("Confirmation password is incorrect. Please try again.");
    } else if (
      !confirmPassword ||
      !newPassword ||
      !oldPassword ||
      confirmPassword === `` ||
      oldPassword === `` ||
      newPassword === ``
    ) {
      setIsErr(true);
      setMsg("Please fill all field.");
    } else if (newPassword === oldPassword) {
      setIsErr(true);
      setMsg("New password must be different from the old.");
    }
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const renderMsg = (msg, isErr) => {
    if (!msg) {
      return <></>;
    } else {
      const status = isErr ? "error" : "success";
      return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={status}>
            {msg}
          </Alert>
        </Snackbar>
      );
    }
  };

  const handleTextChange = (e) => {
    switch (e.target.name) {
      case `oldPassword`:
        setOldPassword(e.target.value);
        break;
      case `newPassword`:
        setNewPassword(e.target.value);
        break;
      case `confirmPassword`:
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      {renderMsg(msg, isErr)}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            label="Old Password"
            name="oldPassword"
            type="password"
            autoFocus
            onChange={(e) => handleTextChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="password"
            onChange={(e) => handleTextChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={(e) => handleTextChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
