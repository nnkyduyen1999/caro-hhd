import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup/signup';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signup' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
