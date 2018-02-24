import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
// import '../../App.css';

class Login extends Component {
    constructor()   {
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

    setInputValue =(key, value)=> {
        this.setState({[key]: value})
      }

    loggingIn = () =>    {
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
        .then(data => {
            if (!data.signIn) {
                this.setState({ error: 'error' })
            } else {
                this.loginPass(data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    loginPass = (x) => {
        this.props.history.push("/main", x);
    }

    login = () =>    {
        const { username, password } = this.state
        return(
            <div>
                Username
                <input  placeholder="Username"
                        value={username}
                        onChange={(e)=> this.setInputValue('username', e.target.value)}>
                </input>
                Password
                <input  placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e)=> this.setInputValue('password', e.target.value)}>
                </input>
                <button type="submit"
                        onClick={this.loggingIn}>Login
                </button>
                <button onClick={this.signUp}>create an account</button>
                <div>{this.state.error}</div>
            </div>
        )
    }
    signUp = () =>  {
        this.props.history.push("/signUp");
    }

    render() {
        return(
            <div>
                {this.login()}
            </div>
        );
    }
}

export default Login;