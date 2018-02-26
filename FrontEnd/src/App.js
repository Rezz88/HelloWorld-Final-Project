import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import SignUp from './views/signUp';
import Login from './views/login';
import Profile from './views/profile'
import Main from './views/main';
import Rating from './views/rating';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signUp" component ={SignUp}/>
          <Route path="/profile" component={Profile} />
          <Route path="/main" component={Main} />
          <Route path="/ratings" component={Rating} />
        </Switch>
      </div>
    );
  }
}

export default App;
