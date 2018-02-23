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
            createAccount: false,
            showSignUp: false
        }
    }

    componentDidMount() {
        console.log('testfront')
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
            } else if (z.loggedIn===true) {
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
            body: JSON.stringify({
                username: username,
                password: password,
            })
            })
            .then(x => x.text())
            .then(x => { console.log(x); return JSON.parse(x); })
            .then(x => {
            if (x.signIn===false)  { 
               //for testing
               this.loginPass({"loggedIn":true,"username":"gray","email":"gray@gmail.com","password":"black","ratings":[]});
            } else {
                this.loginPass(x);
            }
        })
        
    }

    loginPass = (x) => {
        const { username , password } = this.state
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