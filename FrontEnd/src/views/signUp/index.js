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
// import FlipClock from './Components/FlipClock'


// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');

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
            day: '',
            month: '',
            year: '',
            age: '',
            gender: '',
            loggedIn: false,
            error: ''
        }
    }


    setInputValue = (key, value) => {
        this.setState({ [key]: value })
    }

    calculateAge = () =>   {
        var day = this.state.day
        var month = this.state.month
        var year = this.state.year
        console.log("dob = ",`${year}-${month}-${day}`)
        let ageFromString = new AgeFromDateString(`${year}-${month}-${day}`).age;
        console.log("value from ageFromString", ageFromString);
        this.setState({age: ageFromString})
        // console.log(this.state.age)

    }

    signingUp = () => {
        //the age calculator on the frontend doesn't ensure that the users age is kept up to date
        //a better alternative would be to have it on the backend
        //or to send an age update everytime the user visits the site...
        this.calculateAge();
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
        const { username, password, password1, email, gender, day, month, year } = this.state
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
                    <div>
                        <select className="button-size" value={month} onChange={(e) => this.setInputValue('month', e.target.value)} >
                            <option value='' selected>Month</option>
                            <option value='1'>Jan</option>
                            <option value='2'>Feb</option>
                            <option value='3'>Mar</option>
                            <option value='4'>Apr</option>
                            <option value='5'>May</option>
                            <option value='6'>Jun</option>
                            <option value='7'>Jul</option>
                            <option value='8'>Aug</option>
                            <option value='9'>Sep</option>
                            <option value='10'>Oct</option>
                            <option value='11'>Nov</option>
                            <option value='12'>Dec</option>
                        </select>
                        <input placeholder="Day"
                            type="number"
                            value={day}
                            onChange={(e) => this.setInputValue('day', e.target.value)}>
                        </input>
                        <input placeholder="Year"
                            type="number"
                            value={year}
                            onChange={(e) => this.setInputValue('year', e.target.value)}>
                        </input>
                    </div>
                </div>
                    <form>
                        <input type="radio"
                            name="gender"
                            value="male"
                            onClick={(e) => this.setInputValue('gender', e.target.value)} />
                        <a className="login-text">Male</a>
                    <input type="radio"
                            name="gender"
                            value="female"
                            onClick={(e) => this.setInputValue('gender', e.target.value)} />
                        <a className="login-text">Female</a>
                    </form>
                    <button className="button-size" onClick={this.signingUp}>Submit</button>
                    <button className="button-size" onClick={this.login}>Already have an account?</button>
                    <div>{this.state.error}</div>
            </div>
                )
            }
        
    login = () =>    {
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
