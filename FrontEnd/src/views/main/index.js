import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Main extends Component {
  constructor()   {
    super();
    this.state = {}
}

  

  render() {
    console.log(this.props)
    //props.location.state is the login information originated at login/index.js
    console.log(this.props.location.state)
    return (
      <div>
        Bar Map
        <div>
          <button onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</button>
        </div>
        <div>
          <button onClick={() => this.props.history.push("/rate", this.props.location.state)}>Rating </button>
        </div>
      </div>
    );
  }
}

export default Main;