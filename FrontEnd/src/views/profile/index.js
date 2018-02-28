import React, { Component } from 'react';
import { Redirect } from 'react-router';
import FlipClock from '../main/Components/FlipClock'
import styled from 'styled-components';
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

const ProfileWrapper = styled.div`
     height: 100vh;
     flex: 1;
     background: url(https://i.imgur.com/TThJDpg.jpg);
     background-size: cover;
`;

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
        barname: 'Fitzroy',
        averageAge: 24,
        attendance: 158,
        date: "06/15/18"
      },
      {
        barname: 'Big in Japan Bar',
        averageAge: 30,
        attendance: 35,
        date: "06/23/18"
      },
      {
        barname: 'Bar Waverly',
        averageAge: 27,
        attendance: 42,
        date: "07/20/18"
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
          <div className="profile-style">
            <div>Venue: {item.barname}</div>
            <div>Average age: {item.averageAge}</div>
            <div>Attendance: {item.attendance}</div>
            <div>{item.date}</div>
          </div>
        )

      })
    } else {
      return <div>Nothing available</div>
    }
  }

  renderUserInfoEdit = () => {
    const { username, email, password  } = this.props.location.state
    const { newEmail, newPassword1, newPassword, oldPassword }  = this.state
    return (
      <div>
        <h4 className="profile-title">Profile Edit</h4>
        <div className="profile-style">
        <div>{"Username: " + username}</div>

        <div>{"E-mail: " + email}</div>
        <div className="edit-screen">
        <input placeholder="Enter New E-mail"
                value={newEmail}
                onChange={(e) => this.setInputValue('newEmail', e.target.value)}>
        </input>
        <input placeholder="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => this.setInputValue('oldPassword', e.target.value)}>
        </input>

        <input placeholder="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => this.setInputValue('newPassword', e.target.value)}>
        </input>

        <input placeholder="Confirm New Password"
          type="password"
          value= {newPassword1}
          onChange={(e) => this.setInputValue('newPassword1', e.target.value)}>
        </input>
        </div>
        <div>
        <button className="button-size2" onClick={this.editing}>Submit changes</button>
        <div>{this.state.error}</div>
        <button className="button-size2" onClick={this.toggleEdit}>Back</button>
        </div>
        </div>
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
      this.setState({ error: 'Passwords do not match' })
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
      <h4 className="profile-title">P R O F I L E</h4>
      <div className="profile-style">
        <div>{"Username: " + username}</div>
        <div>{"Gender: " + gender}</div>
        <div>{"Age: " + age}</div>
        <div>{"E-mail: " + email}</div>
        <button onClick={this.toggleEdit}>Edit</button>
      </div>
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
    method: 'get',
    credentials: 'include'
  })
  this.props.location.state.loggedIn = false;
  console.log('logout = ', this.props.location.state)
  this.props.history.push("/", this.props.location.state)
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
              <div className="ttlc">
              L a s t - c a l l
              <FlipClock inverse={!this.props.mapState} />
              </div>  
              <NavButtonWrapper>
                {this.renderMainButton()}
                {this.renderLogout()}
              </NavButtonWrapper>
            </NavBar>
            <ProfileWrapper>
            <div>
              {this.state.editing ? this.renderUserInfoEdit() : this.renderUserInfo()}
              <h4 className="profile-title">H I S T O R Y</h4>
              {this.renderBarHistory()}
            </div>
            </ProfileWrapper>
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


export default Profile;
