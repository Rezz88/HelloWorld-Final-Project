import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../App.css';

class Locations extends Component {
  render() {
    return (
      <div>
        main locations page
        <div>
        <Link to="/profile"> profile </Link>
        </div>
      </div>
    );
  }
}

export default Locations;