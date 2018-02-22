import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {}
  }
//FUCK
  render() {
    // Props to be passed down from app.js
    console.log('Profile page ', this.props.location.state)
    //for now the state is undefined unless someone logs in
    if (this.props.location.state !== undefined) {
      const { username, email } = this.props.location.state
      return (
        <div>
          Profile
        <div>Display Picture{/* {display} */}</div>
          <div>{"Username: " + username}</div>
          <div>Gender{/* {"Gender: " + gender} */}</div>
          <div>Age{/* {"Age: " + age} */}</div>
          <div>{"E-mail: " + email}</div>
          <div>
            <button onClick={() => this.props.history.push('/main', this.props.location.state
            )}>Bar Map</button>
          </div>
          <div>
            <button onClick={() => this.props.history.push('/settings', this.props.location.state
            )}>Settings</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

export default Profile;
