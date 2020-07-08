import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Index from './components/layouts';
import Login from './components/layouts/Login';
import SignUp from './components/layouts/SignUp';
import User from './components/layouts/User';
import Profile from './components/layouts/Profile';
import NewTx from './components/layouts/NewTx';
import SelectUser from './components/layouts/NewTx/SelectUser';
import Logout from './components/layouts/User/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact strict path="/" component={Index} />
        <Route exact strict path="/login" component={Login} />
        <Route exact strict path="/signup" component={SignUp} />
        <Route exact strict path="/user" component={User} />
        <Route exact strict path="/profile" component={Profile} />
        <Route exact strict path="/newtx" component={NewTx} />
        <Route exact strict path="/select/user" component={SelectUser} />
        <Route exact strict path="/logout" component={Logout} />
      </BrowserRouter>
    </div>

  );
}

export default App;