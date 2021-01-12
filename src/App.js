import React from "react";
import "./App.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import {createMuiTheme, CssBaseline, ThemeProvider} from "@material-ui/core";
import Game from "./components/Game/game";
import PublicRoute from "./router/public-router";
import PrivateRoute from "./router/private-router";
import {AuthenticationProvider} from "./providers/authenticationProvider";
import Home from "./components/Home/home";
import RoomList from "./components/RoomList/room-list";
import TopPlayers from "./components/TopPlayers/topPlayers";
import History from "./components/History/history";
import Activate from "./components/Activate/activate";
import ForgetPassword from "./components/ForgetPassword/forgetPassword";
import ResetPassword from "./components/ForgetPassword/resetPassword";
import Room from "./components/Room/room";
import Profile from "./components/Profile/index";

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
            <PublicRoute component={RoomList} path="/room" exact/>
            <PublicRoute component={Activate} path="/user/activate/:token" exact/>
            <PublicRoute component={ForgetPassword} path="/user/forget-password" exact/>
            <PublicRoute component={ResetPassword} path="/user/reset-password/:token" exact/>
            <PrivateRoute path="/top-players" component={TopPlayers} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/game/:roomId" component={Game} />
            <PrivateRoute path="/room/:roomId" component={Room} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/history" component={History} />
            {/*<PrivateRoute path="/chat" component={Chat} />*/}
          </Switch>
        </BrowserRouter>
      </AuthenticationProvider>
    </ThemeProvider>
  );
}

export default App;
