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
            signedUp: false,
        }
    }

    componentDidMount() {

        }

        //checking to see if they are logged in
        //set up mock data to test get endpoint. object might include loggedIn state, username etc
        //
    componentWillMount()    {
    //mock data setup for login
        //  var z = {
        //     cookies: true,
        //     username: 'John', 
        //     email: 'email',
        //     loggedIn: true
        // }
        // if (z.cookies===true)  {
        //     if(z.loggedIn===true)   {
        //         this.props.history.push("/main", z);
        //     } else {
        //         this.props.history.push("/", z);
        //     }
        // } else {
        //     this.props.history.push("/");
        // }
        
        fetch('/cookie', {
            method: "get",
            credentials: "include"
        })
        .then(x => x.text())
        .then(y => JSON.parse(y))
        .then(x=> {console.log('this is what youre getting for cookies!!',x); return x})
        .then(z => {
            if (z.cookies===true)  {
                if(z.loggedIn===true)   {
                    this.props.history.push("/main", z);
                } else {
                    this.props.history.push("/", z);
                }
            } else {
                this.props.history.push("/");
            }})
    }

    setInputValue =(key, value)=> {
        this.setState({[key]: value})
      }

    signingUp = () =>  {
        const { username, password, email} = this.state
        fetch('/sign-up', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
            })
            .then(x => x.text())
            .then(x => JSON.parse(x))
            .then(x => {
            if (x.response===true)  { 
                this.signUpPass()
            } else {
                console.log('email in use response should be false = ', x.response )
            }
        })
            //if false display message to the user to use diff username or password
    }

    signUpPass = () =>  {
        const { username, password, email} = this.state
        this.props.history.push("/main", {
            username: username, 
            password: password,
            email: email,
            loggedIn: true
        });
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
            .then(x => JSON.parse(x))
            .then(x => {
            if (x.signIn===false)  { 
                //do seomthing (tell them to try again)
            } else {
                this.loginPass(x);
            }
        })
        
    }

    loginPass = (x) => {
        const { username , password } = this.state
        this.props.history.push("/main", x);
    }

    signUp = () =>   {
        const { username, password, password1, email } = this.state
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
                re-type Password
                <input  placeholder="Password" 
                        type="password" 
                        value={password1} 
                        onChange={(e)=> this.setInputValue('password', e.target.value)}>
                </input>
                Email
                <input  placeholder="e-mail" 
                        value={email} 
                        onChange={(e)=> this.setInputValue('email', e.target.value)}>
                </input>
                <button onClick={this.signingUp}>Sign-up</button>
                <button onClick={()=>{this.setState({signedUp: true})}}>Already have an account?</button>
            </div>
        )
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
            </div>
        )
    }

    render() {
        return(
            <div>
                {this.state.signedUp ? this.login() : this.signUp()}
            </div>
            );

    }
}

export default Login;