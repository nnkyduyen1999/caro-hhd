import React, {useContext, useEffect, useState} from "react";
import {AuthenticationContext} from "../../providers/authenticationProvider";
import {useStyles} from "../Signup/useStyles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";
import {GoogleLogin} from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {GOOGLE_CLIENT_ID} from "../../global/constant";

export default function Login() {
  // console.log("client id:", process.env.REACT_APP_GOOGLE_CLIENT_ID)
  const authenticationContext = useContext(AuthenticationContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (authenticationContext.authenState.isAuthenticated) {
      history.push("/home");
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

    if (username === "" || password === "") {
      setError(true);
      setErrorMessage("Please fill in all required fields");
      return;
    }
    authenticationContext.login(username, password);
  };
  console.log(authenticationContext.authenState);
  const renderErrorMsg = (state) => {
    if (!state.errMsg) {
      return <></>;
    } else {
      return <Alert severity="error">{state.errMsg}</Alert>;
    }
  };

  const responseGoogle = (response) => {
    console.log("login gg success", response);
    const { email, googleId, givenName, familyName } = response.profileObj;
    authenticationContext.loginGoogle(email, googleId, givenName, familyName);
  };

  const responseFacebook = (response) => {
    const familyName = response.name.split(" ").pop();
    const givenName = response.name.slice(
      0,
      response.name.length - familyName.length - 1
    );
    console.log(`--${givenName}--${familyName}--`);
    console.log("login fb", response);
    authenticationContext.loginFacebook(
      response.email,
      response.id,
      givenName,
      familyName
    );
  };
  return (
    <Grid container className={classes.root}>
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
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div className={classes.btnSection}>
                    <GoogleLogin
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Login by google"
                      onSuccess={responseGoogle}
                      onFailure={(response) => {
                        console.log("login gg failed", response);
                      }}
                    buttonText="Login by Google"
                    className={classes.btnGoogle}
                    cookiePolicy={"single_host_origin"}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <FacebookLogin
                    appId="188674462909520"
                    // autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    cssClass={classes.btnFacebook}
                   // icon={<FacebookIcon style={{marginLeft:'10px'}}/>}
                    textButton="Login by Facebook"
                    icon="fa-facebook"
                  />
                </Grid>
              </Grid>

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
