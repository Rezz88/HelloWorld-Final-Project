import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
//right now I'm sending the whole state above
    componentDidMount() {
        // fetch('/sign-up', {
        //     method: 'post',
        //     body: JSON.stringify(this.state)
        //     })
        //     .then(x => x.text())
        //     .then(x => JSON.parse(x))
        //     .then(x => {})
            //do I need anything back?
        }


    setInputValue =(key, value)=> {
        this.setState({[key]: value})
      }

//can we/ how do we use cookies here to bypass the loggin state?
    signingUp = () =>  {
        
        const { username , password, email} = this.state
        this.props.history.push("/", {
            username: username, 
            password: password,
            email: email,
            loggedIn: true
        });
    }

    loggingIn = () =>    {

        const { username , password } = this.state
        this.props.history.push("/", {
            username: username,
            password: password, 
            loggedIn: true
        });
    }

    signUp = () =>   {
        const { username, password, email } = this.state
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
