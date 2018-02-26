import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      barHistory: []
    }
  }

  componentWillMount() {
    let data = [
      {
        barname: 'bar1name',
        averageAge: 30,
        attendance: 200,
      },
      {
        barname: 'bar2name',
        averageAge: 20,
        attendance: 150,
      }
    ]
    this.setState({barHistory: data})

  }
  renderBarHistory = () => {
    const { barHistory } = this.state;
    if (barHistory.length) {
        return barHistory.map(item => {
            // console.log(product)
            return (
              <div>
                <div>Venue: {item.barname}</div>
                <div>Average age: {item.averageAge}</div>
                <div>Attendance: {item.attendance}</div>
              </div>
            )

        })
    } else {
        return <div>Nothing available</div>
    }
}

  renderUserInfo = () => {
    //Will be filled with user info from sign-up
    const { username, email, gender, age } = this.props.location.state
    return (
      <div>
        <h4>Profile</h4>
        <div>{"Username: " + username}</div>
        <div>{"Gender: " + gender}</div>
        <div>{"Age: " + age}</div>
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

  // renderBarHistory = () => {
  //   //Will be filled with user bar info
  //   const { barName, barRatio, barAge, barNum } = this.props.location.state
  //   return (
  //     <div>
  //       <h4>Bar History</h4>
  //       <div>{"barName: " + barName}</div>
  //       <div>{"barRatio: " + barRatio}</div>
  //       <div>{"barAge: " + barAge}</div>
  //       <div>{"barNum: " + barNum}</div>
  //     </div>
  //   )
  // };

  logout = () => {
    console.log('logout before fetch = ', this.props.location.state)
    fetch('/logout', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
        loggedIn: false
      })
    })
    this.props.location.state.loggedIn = false;
    console.log('logout = ', this.props.location.state)
    this.props.history.push("/")
  };

  renderLogout = () => {
    return (
      <div>
        <button onClick={this.logout}>Logout</button>
      </div>
    )
  };

  render() {
    //Props to be passed down from app.js
    console.log('Profile page ', this.props.location.state)
    //For now the state is undefined unless someone logs in
    if (this.props.location.state.loggedIn === true) {
      return (
        <div>
          {this.renderUserInfo()}
          {this.renderProfileButton()}
          {this.renderBarHistory()}
          {this.renderLogout()}
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
