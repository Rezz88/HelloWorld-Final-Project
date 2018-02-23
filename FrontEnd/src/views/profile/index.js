import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {}
  }

  renderUserInfo = () => {
    //Will be filled with user info from sign-up
    const { username, email } = this.props.location.state
    return (
      <div> Profile
        <div>Display Picture{/* {display} */}</div>
        <div>{"Username: " + username}</div>
        <div>Gender{/* {"Gender: " + gender} */}</div>
        <div>Age{/* {"Age: " + age} */}</div>
        <div>{"E-mail: " + email}</div>
      </div>
    )
  };

  renderProfileButton = () => {
    return (
      <div>
        <button onClick={
          () => this.props.history.push('/main', this.props.location.state
          )}>Bar Map</button>
      </div>
    )
  };

  renderSettingsButton = () => {
    return (
      <div>
        <button onClick={
          () => this.props.history.push('/settings', this.props.location.state
          )}>Settings</button>
      </div>
    )
  };

  renderBarHistory = () => {
    //Will be filled with user bar info
    const { barName, barRatio, barAge, barNum } = this.props.location.state
    return (
      <div> Bar History
        <div>{"barName: " + barName}</div>
        <div>{"barRatio: " + barRatio}</div>
        <div>{"barAge: " + barAge}</div>
        <div>{"barNum: " + barNum}</div>
      </div>
    )
  };

  render() {
    //Props to be passed down from app.js
    console.log('Profile page ', this.props.location.state)
    //For now the state is undefined unless someone logs in
    if (this.props.location.state !== undefined) {
      return (
        <div>
          {this.renderUserInfo()}
          {this.renderProfileButton()}
          {this.renderSettingsButton()}
          {this.renderBarHistory()}
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
