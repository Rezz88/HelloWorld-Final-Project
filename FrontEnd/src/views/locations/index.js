import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Locations extends Component {

  render() {
    console.log(this.props)
    return (
      <div>
        Bar Map
        <div>
          <button onClick={() => this.props.history.push("/profile")}>Your Profile</button>
        </div>
        <div>
          <button onClick={() => this.props.history.push("/rate")}>Rate </button>
        </div>
      </div>
    );
  }
}

export default Locations;