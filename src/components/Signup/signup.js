import React, { useState } from "react";
import { useStyles } from "./useStyles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  console.log(process.env);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
  const history = useHistory();

  const handleChangeTextField = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmedPassword":
        setConfirmedPassword(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;

      default:
        break;
    }

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      email === "" ||
      username === "" ||
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      confirmedPassword === ""
    ) {
      setError(true);
      setErrorMessage("Please fill in all required fields");
      return;
    }
    if (password !== confirmedPassword) {
      setError(true);
      setErrorMessage("The password confirmation does not match");
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
        email: email,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName
      })
      .then(
        (res) => {
          history.push("/login");
        },
        (err) => {
          setError(true);
          setErrorMessage(err.response.data.message);
        }
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
              Signup
            </Typography>
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
                id="eamil"
                label="Email"
                name="email"
                autoFocus
                onChange={handleChangeTextField}
              />
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
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    error={error}
                    helperText={errorMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First name"
                    name="firstName"
                    onChange={handleChangeTextField}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={error}
                    helperText={errorMessage}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    name="lastName"
                    onChange={handleChangeTextField}
                  />
                </Grid>
              </Grid>

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
              <TextField
                error={error}
                helperText={errorMessage}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmedPassword"
                label="Confirmed password"
                type="password"
                id="confirmedPassword"
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
                  Signup
                </Button>
              </div>

              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Signup;
