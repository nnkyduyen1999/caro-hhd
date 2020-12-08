import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../providers/authenticationProvider";
import { useStyles } from "../Signup/useStyles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

export default function Login() {
  const authenticationContext = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
  const history = useHistory();
  
  useEffect(() => {
    if (authenticationContext.authenState.isAuthenticated) {
      history.push("/");
    }
  }, [authenticationContext.authenState.isAuthenticated, history]);

  const handleChangeTextField = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      username === "" ||
      password === "" 
    ) {
      setError(true);
      setErrorMessage("Please fill in all required fields");
      return;
    }
    authenticationContext.login(username, password);
  };
  console.log(authenticationContext.authenState);
  const renderErrorMsg = (state) => {
    if (!state.errMsg) {
      return <></>
    } else {
    return <Alert severity="error">{state.errMsg}</Alert>
    }
  }

  return (
    <Grid container spacing={3} className={classes.root}>
      <Hidden smDown>
        <Grid item md={7} className={classes.image} />
      </Hidden>
      <Grid className={classes.formContainer} item xs sm md={5}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            {renderErrorMsg(authenticationContext.authenState)}
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              className={classes.form}
              noValidate
            >
              <TextField
                error={error}
                helperText={errorMessage}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={handleChangeTextField}
              />
              
              <TextField
                error={error}
                helperText={errorMessage}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChangeTextField}
              />
              
              <div className={classes.btnSection}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.signInBtn}
                >
                  Log in
                </Button>
              </div>

              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Have no account? Sign up now"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );

}
