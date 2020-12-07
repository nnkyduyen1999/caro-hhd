import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import {AuthenticationProvider} from "./providers/authenticationProvider";

function App() {
  return (
    <AuthenticationProvider>
<BrowserRouter>
      <Switch>
      <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
    </AuthenticationProvider>
    
  );
}

export default App;
