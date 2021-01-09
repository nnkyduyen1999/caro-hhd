import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Game from "./components/Game/game";
import PublicRoute from "./router/public-router";
import PrivateRoute from "./router/private-router";
import {AuthenticationProvider} from "./providers/authenticationProvider";
import Home from "./components/Home/home";
import Chat from "./components/Chat/chat";
import RoomList from "./components/RoomList/room-list";
import Header from "./components/Header/header";
import TopPlayers from "./components/TopPlayers/topPlayers";
import History from "./components/History/history";

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
            <PrivateRoute path="/top-players" component={TopPlayers} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/game/:roomId" component={Game} />
            <PrivateRoute path="/history" component={History} />
            {/*<PrivateRoute path="/chat" component={Chat} />*/}
          </Switch>
        </BrowserRouter>
      </AuthenticationProvider>
    </ThemeProvider>
  );
}

export default App;
