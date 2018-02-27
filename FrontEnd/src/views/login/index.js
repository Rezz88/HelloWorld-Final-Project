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
// import '../../App.css';

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

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            loggedIn: false,
            error: ''
        }
    }

    componentWillMount() {
        fetch('/cookie', {
            method: "post",
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    this.props.history.push('/main', data);
                } else {
                    this.props.history.push('/', data);
                }
            }).catch((err) => {
                console.log(err);
            })
            .catch(e => console.log(e));
    }

    setInputValue = (key, value) => {
        this.setState({ [key]: value })
    }

    loggingIn = () => {
        const { username, password } = this.state
        fetch('/login', {
            method: 'post',
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password,
                loggedIn: true
            })
        }).then(response => response.json())
            .then(data => { console.log(data); return data })
            .then(data => {
                if (!data.loggedIn) {
                    this.setState({ error: data.error })
                } else {
                    this.loginPass(data);
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    loginPass = (data) => {
        this.props.history.push("/main", data);
    }

    login = () => {
        const { username, password } = this.state
        return (
            <div className="login-screen" >
                <div>
                    <h3 className="login-text">Login</h3>
                    <input placeholder="Username"
                        value={username}
                        onChange={(e) => this.setInputValue('username', e.target.value)}>
                    </input>
                </div>
                <div>
                    <input placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => this.setInputValue('password', e.target.value)}>
                    </input>
                </div>
                <div>
                    <button className="button-size" type="submit"
                        onClick={this.loggingIn}>Login
                </button>
                </div>
                <button className="button-size" onClick={this.signUp}>Sign-up</button>
                <div className="login-text">{this.state.error}</div>
            </div>
        )
    }
    signUp = () => {
        this.props.history.push("/signUp");
    }

    render() {
        return (
            <Wrapper>
                <NavBar>
                <MainHeader>WhatsLit</MainHeader>
                </NavBar>
                <LoginWrapper>{this.login()}</LoginWrapper>
            </Wrapper>
        );
    }
}

export default Login;