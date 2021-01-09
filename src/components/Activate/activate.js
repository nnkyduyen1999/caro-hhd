import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function Activate() {
  const classes = useStyles();

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
        >
          Verify Email
        </CustomButton>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
