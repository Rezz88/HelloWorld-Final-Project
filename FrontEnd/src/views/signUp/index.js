import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class SignUp extends Component {
    constructor()   {
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

    setInputValue =(key, value)=> {
        this.setState({[key]: value})
      }

    signingUp = () =>  {
        console.log('signing up')
        const { username, password, email, age, gender} = this.state
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
            .then(x=> {console.log('this is the response',x); return x})
            //response fails if there is an error in the sign up
            .then(x => {
            if (x.response===true)  { 
                this.signUpPass()
            } else {
                // if I don't send the right data the response I get
                //throws an error on the page, not what I want to happen below
                this.setState({error: x.error})
            }
            })
            //if false display message to the user to use diff username or password
    }

    signUpPass = () =>  {
        const { username, password, password1, email, age, gender} = this.state
        if (password===password1)   {
        this.props.history.push("/main", {
            username: username, 
            password: password,
            age: age,
            gender: gender,
            email: email,
            loggedIn: true
        });
    } else {
        this.setState({error: 'error'})
    }
    }

    signUp = () =>   {
        const { username, password, password1, email, age, gender } = this.state
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
                <input  placeholder="re-enter Password" 
                        type="password" 
                        value={password1} 
                        onChange={(e)=> this.setInputValue('password1', e.target.value)}>
                </input>
                Email
                <input  placeholder="e-mail" 
                        value={email} 
                        onChange={(e)=> this.setInputValue('email', e.target.value)}>
                </input>
                age
                <input  placeholder="age"
                        type= "number"  
                        value={age} 
                        onChange={(e)=> this.setInputValue('age', e.target.value)}>
                </input>
                gender
                <form>
                    <input  type="radio" 
                            name="gender" 
                            value="male"
                            onClick={(e)=> this.setInputValue('gender', e.target.value)}/>
                    male
                    <input  type="radio" 
                            name="gender" 
                            value="female"
                            onClick={(e)=> this.setInputValue('gender', e.target.value)}/>
                    female
                </form>
                <button onClick={this.signingUp}>Sign-up</button>
                <button onClick={this.login}>Already have an account?</button>
                <div>{this.state.error}</div>
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