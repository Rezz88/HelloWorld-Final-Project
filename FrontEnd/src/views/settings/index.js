import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Settings extends Component {
    constructor() {
        super();
        this.state = {}
    }

    logout = () =>  {
        console.log('logout before fetch = ', this.props.location.state)
        fetch('/logout',    {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({
                loggedIn: false
            })
            })
        this.props.location.state.loggedIn = false;
        console.log('logout = ' , this.props.location.state)
        this.props.history.push("/")
    };

    render() {
        console.log(this.props)
        //props.location.state is the login information originated at login/index.js
        console.log('Settings page = ',this.props.location.state)
        if (this.props.location.state.loggedIn === true) {
            return (
                <div>
                    Settings
                    <div>
                        <button onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</button>
                    </div>
                    <div>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            );
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }
}

export default Settings;