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
        .then(x => x.text())
        .then(y => JSON.parse(y))
        .then(x=> {console.log('this is what youre getting for cookies!!',x); return x})
        .then(z => {
            if (z.cookies===false)  {
                this.props.history.push("/");
            }
            if (z.loggedIn===true) {
                this.props.history.push("/main", z);
            } else {
                this.props.history.push("/", z);
            }
        })
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
            })
            .then(x => x.text())
<<<<<<< HEAD
            .then(x => console.log(x))
            .then(x => JSON.parse(x))
=======
            .then(x => { console.log(x); return JSON.parse(x); })
>>>>>>> 7a8ffac9f2dcbd338cfe35341eecc0c214ebec05
            .then(x => {
            if (x.signIn===false)  { 
                this.setState({error: 'error'})
            } else {
                this.loginPass(x);
            }
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