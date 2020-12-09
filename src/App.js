import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import { AuthenticationProvider } from "./providers/authenticationProvider";
import OnlineUsers from "./components/OnlineUsers/online-users";

function App() {
  return (
    <AuthenticationProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/online-users" component={OnlineUsers} />
        </Switch>
      </BrowserRouter>
    </AuthenticationProvider>
  );
}

export default App;
