import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import { AuthenticationProvider } from "./providers/authenticationProvider";
import OnlineUsers from "./components/OnlineUsers/online-users";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Game from "./components/Game/game";

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthenticationProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/online-users" component={OnlineUsers} />
            <Route path='/game' component={Game} />
          </Switch>
        </BrowserRouter>
      </AuthenticationProvider>
    </ThemeProvider>
  );
}

export default App;
