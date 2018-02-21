import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

class Profile extends Component {
  render() {
    return (
      <div>
        profile
        <div>
            <Link to="/"> to locations page </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
