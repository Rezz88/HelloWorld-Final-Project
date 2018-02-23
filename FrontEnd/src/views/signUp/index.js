import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class SignUp extends Component {
    constructor()   {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            loggedIn: false,
            createAccount: true
        }
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
            .then(x => console.log(x))
            /*.then(x => JSON.parse(x))
            .then(x => {
            if (x.response===true)  { 
                console.log( x)
                this.signUpPass()
            } else {

                console.log( x.response )
            }
            })*/
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
                {/* re-type Password
                <input  placeholder="Password" 
                        type="password" 
                        value={password1} 
                        onChange={(e)=> this.setInputValue('password', e.target.value)}>
                </input> */}
                Email
                <input  placeholder="e-mail" 
                        value={email} 
                        onChange={(e)=> this.setInputValue('email', e.target.value)}>
                </input>
                <button onClick={this.signingUp}>Sign-up</button>
                <button onClick={this.login}>Already have an account?</button>
            </div>
        )
    }

    login = () =>    {
      this.props.history.push("/");
    }


    render() {
        return(
            <div>
                {this.signUp()}
            </div>
            );

    }
}

export default SignUp;