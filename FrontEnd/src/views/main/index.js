import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Main extends Component {
<<<<<<< HEAD:FrontEnd/src/views/main/index.js
  constructor()   {
    super();
    this.state = {}
}

  
=======
>>>>>>> 6993c4365a3f8bf2c7dd824cbd941c641ff36d4f:FrontEnd/src/views/main/index.js

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
          <button onClick={() => this.props.history.push("/rate", this.props.location.state)}>Rate </button>
        </div>
      </div>
    );
  }
}

export default Main;