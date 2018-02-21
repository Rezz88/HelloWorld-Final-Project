import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Settings extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        console.log(this.props)
        //props.location.state is the login information originated at login/index.js
        console.log(this.props.location.state)
        if (this.props.location.state !== undefined) {
            return (
                <div>
                    Settings
                <div>
                        <button onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</button>
                    </div>
                    <div>
                        <button onClick={() => this.setState({ loggedIn: false })}>Logout</button>
                    </div>
                </div>
            );

        } else {
            return (
                <div>Please login</div>
            )
        }
    }
}

export default Settings;