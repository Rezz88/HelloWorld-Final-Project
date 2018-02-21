import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    // Props to be passed down from app.js
    // const { display, username, gender, age, email } = this.props
    console.log(this.props.location.state)
    const { username, email } = this.props.location.state
    return (
      <div>
        Profile
        <div>Display Picture
          {/* {display} */}
        </div>
        <div>
          {"Username: " + username}
        </div>
        <div>Gender
          {/* {gender} */}
        </div>
        <div>Age
          {/* {age} */}
        </div>
        <div>
          {"E-mail: " + email}
        </div>
        <div>
          <button onClick={() => this.props.history.push('/', this.props.location.state
          )}>Bar Map</button>
        </div>
        <div>
          <button onClick={() => this.props.history.push('/settings', this.props.location.state
          )}>Settings</button>
        </div>
      </div>
    );
  }
}

export default Profile;
