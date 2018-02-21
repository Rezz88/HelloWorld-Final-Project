import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from './views/login';
import Profile from './views/profile'
import Main from './views/main';
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
          <Route exact path="/" component={Main} />
        </Switch>
        <div>
          <button onClick={() => this.setState({ loggedIn: false })}>Logout</button>
        </div>
      </div>
    );
  }
}

export default App;
