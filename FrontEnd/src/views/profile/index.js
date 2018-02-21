import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Profile extends Component {
    constructor()   {
        super();
        this.state = {}
    }

  render() {
    // Props to be passed down from app.js
    // const { display, username, gender, age, email } = this.props
    console.log('Profile page ', this.props.location.state)
    //for now the state is undefined unless someone logs in
    if (this.props.location.state!==undefined) {
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
          <button onClick={() => this.props.history.push('/main', this.props.location.state
          )}>Bar Map</button>
        </div>
      </div>
    );}
    else {
        return (
        <div>Please login</div>
        )
      }
  }
}

export default Profile;
