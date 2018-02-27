import React, { Component } from 'react';
import styled from 'styled-components';
import {
    MainHeader,
    constants,
    mediaSizes,
    NavBar,
    NavButton,
    NavButtonWrapper
} from '../styles';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

const Wrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const LoginWrapper = styled.div`
     flex: 1;
     background: url(https://cdn.mtlblog.com/uploads/272655_030b5a01fc8b7c76d3587ead4e8f04ffbb0acdc6.jpg);
     background-size: cover;
`;

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password1: '',
            email: '',
            age: '',
            gender: '',
            loggedIn: false,
            error: ''
        }
    }

    setInputValue = (key, value) => {
        this.setState({ [key]: value })
    }

    signingUp = () => {
        console.log('signing up')
        const { username, password, email, age, gender } = this.state
        fetch('/sign-up', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                age: age,
                gender: gender,
                loggedIn: true
            })
        })
            .then(x => x.text())
            .then(x => JSON.parse(x))
            .then(x => { console.log('this is the response', x); return x })
            //response fails if there is an error in the sign up
            .then(x => {
                if (x.response === true) {
                    this.signUpPass()
                } else {
                    // if I don't send the right data the response I get
                    //throws an error on the page, not what I want to happen below
                    this.setState({ error: x.error })
                }
            })
        //if false display message to the user to use diff username or password
    }

    signUpPass = () => {
        const { username, password, password1, email, age, gender } = this.state
        if (password === password1) {
            this.props.history.push("/main", {
                username: username,
                password: password,
                age: age,
                gender: gender,
                email: email,
                loggedIn: true
            });
        } else {
            this.setState({ error: 'error' })
        }
    }

    signUp = () => {
        const { username, password, password1, email, age, gender } = this.state
        return (
            <div className="login-screen">
                <div>
                    <h3 className="login-text">Sign-Up</h3>
                    <input placeholder="Username"
                        value={username}
                        onChange={(e) => this.setInputValue('username', e.target.value)}>
                    </input>

                    <input placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => this.setInputValue('password', e.target.value)}>
                    </input>

                    <input placeholder="Confirm Password"
                        type="password"
                        value={password1}
                        onChange={(e) => this.setInputValue('password1', e.target.value)}>
                    </input>

                    <input placeholder="E-mail"
                        value={email}
                        onChange={(e) => this.setInputValue('email', e.target.value)}>
                    </input>

                    <input placeholder="Age"
                        type="number"
                        value={age}
                        onChange={(e) => this.setInputValue('age', e.target.value)}>
                    </input>
                </div>
                <form className="login-text">
                    <input type="radio"
                        name="gender"
                        value="male"
                        onClick={(e) => this.setInputValue('gender', e.target.value)} />
                    <a>Male</a>
                    <input type="radio"
                        name="gender"
                        value="female"
                        onClick={(e) => this.setInputValue('gender', e.target.value)} />
                    <a>Female</a>
                </form>
                <button className="button-size" onClick={this.signingUp}>Submit</button>
                <button className="button-size" onClick={this.login}>Already have an account?</button>
                <div className="login-text" >{this.state.error}</div>
            </div>
        )
    }

    login = () => {
        this.props.history.push("/");
    }


    render() {
        return (
            <Wrapper>
                <NavBar>
                    <div className="div-flex">
                    <MainHeader>WhatsLit</MainHeader>
                    <div className="split">
                    <img src="https://i.imgur.com/fSG9Cdt.png" height="30" width="35"/>
                    </div>
                    </div>
                </NavBar>
                <LoginWrapper>{this.signUp()}</LoginWrapper>
            </Wrapper>
        );
    }
}

export default SignUp;
