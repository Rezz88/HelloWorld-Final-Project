import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './views/login';
import Profile from './views/profile'
import Locations from './views/locations';
import Rate from './views/rate';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/rate" component={Rate} />
          <Route exact path="/" component={Locations} />
        </Switch>
      </div>
    );
  }
}

export default App;
