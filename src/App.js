import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import OnlineUsers from "./components/OnlineUsers/online-users";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Game from "./components/Game/game";
import PublicRoute from "./router/public-router";
import PrivateRoute from "./router/private-router";
import {AuthenticationProvider} from "./providers/authenticationProvider";
import Home from "./components/Home/home";
import Chat from "./components/Chat/chat";

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
            <Route exact path='/'>
              <Redirect to='/login'/>
            </Route>
            <PublicRoute restricted={true} component={Login} path="/login" exact/>
            <PublicRoute component={Signup} path="/signup" exact/>
            <PrivateRoute path="/online-users" component={OnlineUsers} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/game" component={Game} />
            <PrivateRoute path="/chat" component={Chat} />
          </Switch>
        </BrowserRouter>
      </AuthenticationProvider>
    </ThemeProvider>
  );
}

export default App;
