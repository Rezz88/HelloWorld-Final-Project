import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

class Profile extends Component {

  render() {
    // Props to be passed down from app.js
    // const { display, username, gender, age, email } = this.props
    console.log(this.props)
    return (
      <div>
        Profile
        <div>Display Picture
          {/* {display} */}
        </div>
        <div>Username
          {/* {username} */}
        </div>
        <div>Gender
          {/* {gender} */}
        </div>
        <div>Age
          {/* {age} */}
        </div>
        <div>E-mail
          {/* {email} */}
        </div>
        <div>
          <button onClick={() => this.props.history.push('/')}>Location Page</button>
        </div>
      </div>
    );
  }
}

export default Profile;
