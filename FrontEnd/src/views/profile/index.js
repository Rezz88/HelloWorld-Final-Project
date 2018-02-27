import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {
  MainHeader,
  NavBar,
  Wrapper,
  FixedWrapper,
  NavButton,
  NavButtonWrapper
} from '../styles';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      barHistory: [],
      newPassword: '',
      newPassword1: '',
      oldPassword: '',
      newEmail: '',
      editing: false,
      error: ''
    }
  }

  componentWillMount() {
    //fake bar data for bar history
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
    this.setState({ barHistory: data })

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
            <div>-</div>
          </div>
        )

      })
    } else {
      return <div>Nothing available</div>
    }
  }

  renderUserInfoEdit = () => {
    const { username, email  } = this.props.location.state

    return (
      <div>
        <h4>Profile</h4>
        <div>{"Username: " + username}</div>

        <div>{"E-mail: " + email}</div>
        <input placeholder="enter new E-mail"
                value=''
                onChange={(e) => this.setInputValue('newEmail', e.target.value)}>
        </input>

        <input placeholder="Old Password"
          type="password"
          value=''
          onChange={(e) => this.setInputValue('oldPassword', e.target.value)}>
        </input>

        <input placeholder="New Password"
          type="password"
          value=''
          onChange={(e) => this.setInputValue('newPassword', e.target.value)}>
        </input>

        <input placeholder="Confirm New Password"
          type="password"
          value= ''
          onChange={(e) => this.setInputValue('newPassword1', e.target.value)}>
        </input>
        <button className="button-size" onClick={this.editing}>Submit changes</button>
        <div>{this.state.error}</div>
        <button className="button-size" onClick={this.toggleEdit}>back</button>
      </div>
    )
}

setInputValue = (key, value) => {
  this.setState({ [key]: value })
}

editing = () => {
  const { username, password, age, gender } = this.props.location.state
  const { newPassword, newPassword1, oldPassword, newEmail } = this.state
  //test old password matches current password
  //test newPassword is typed correctly twice
  if (oldPassword===password && newPassword===newPassword1) { 
    fetch('/profile', {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify({
          password: newPassword,
          email: newEmail,
      })
  })

  this.props.history.push("/profile", {
    username: username,
    password: newPassword,
    age: age,
    gender: gender,
    email: newEmail,
    loggedIn: true
});

  } else {
      this.setState({ error: 'passwords do not match' })
  }
  this.setState({editing: false})

}

toggleEdit = () =>  {
  this.setState({editing: !this.state.editing})
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
      <button onClick={this.toggleEdit}>Edit</button>
    </div>
  )
};

renderMainButton = () => {
  return (
    <div>
      <NavButton onClick={
        () => this.props.history.push('/main', this.props.location.state
        )}>Back to Map</NavButton>
    </div>
  )
};

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
      <NavButton onClick={this.logout}>Logout</NavButton>
    </div>
  )
};


  render() {
    //Props to be passed down from app.js
    console.log('Profile page ', this.props.location.state)
    //For now the state is undefined unless someone logs in
    if (this.props.location.state.loggedIn === true) {
      return (
        <Wrapper>
          <FixedWrapper>
            <NavBar>
              <div className="div-flex">
              <MainHeader>WhatsLit</MainHeader>
              <div className="split">
              <img src="https://i.imgur.com/fSG9Cdt.png" height="30" width="35" />
              </div>
              </div>
              <NavButtonWrapper>
                {this.renderMainButton()}
                {this.renderLogout()}
              </NavButtonWrapper>
            </NavBar>
            <div>
              {this.state.editing ? this.renderUserInfoEdit() : this.renderUserInfo()}
              <h4>Bar History</h4>
              {this.renderBarHistory()}
            </div>
          </FixedWrapper>
        </Wrapper>
      );
    }
    else {
      return (
        <Redirect to="/" />
      )
    }

  }
}
}

export default Profile;
