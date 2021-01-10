import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CustomButton = withStyles((theme) => ({
  root: {
    width: 310,
    height: 60,
    textTransform: "capitalize",
    letterSpacing: "1px",
    fontWeight: 400,
    fontSize: 20,
  },
}))(Button);

export default function Activate({ match }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [succeed, setSucceed] = React.useState(false);
  const [msg, setMsg] = useState(``);

  const handleClick = () => {
    const token = match.params.token;
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/activate`, {
        token: token,
      })
      .then(
        (res) => {
          setMsg(res.data.message);
          setSucceed(true);
          // localStorage.setItem('emailToken', res.data.tokenFromEmail);
          // history.push(`/user/activate/${emailToken}`);
        },
        (err) => {
          setMsg(err.response.data.message);
          setSucceed(false);
        }
      );
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src={process.env.PUBLIC_URL + "/img/email.svg"}
          alt="mail"
          style={{ width: 150, height: 150 }}
        />
        <Typography
          component="h2"
          variant="h4"
          style={{ paddingBottom: 20, paddingTop: 30 }}
        >
          Verification
        </Typography>
        <Typography component="h4" variant="h6" style={{ paddingBottom: 40 }}>
          Click this button to finish verifying your email address.
        </Typography>
        <CustomButton
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleClick}
        >
          Verify Email
        </CustomButton>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {succeed ? (
            <Alert onClose={handleClose} severity="success">
              {msg}
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="error">
              {msg}
            </Alert>
          )}
        </Snackbar>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
