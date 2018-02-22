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
            response: undefined,
            loggedIn: false,
            signedUp: false,
        }
    }
//right now I'm sending the whole state above
    componentDidMount() {
<<<<<<< HEAD:FrontEnd/src/views/login/index.js
        const { username, password, email} = this.state
        fetch('/sign-up', {
            method: 'post',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
            })
            // .then(x => x.text())
=======
        // const { username, password, email} = this.state
        // fetch('/sign-up', {
        //     method: 'post',
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //         email: email
        //     })
        //     })
            
        //     .then(x => x.text())
        //     .then(x=>{console.log('componentdidmount ',x)})
>>>>>>> 5e773dfed4fd4988f89607c2f900e67039d05fd0:frontEnd/src/views/login/index.js
            // .then(x => JSON.parse(x))
            // .then(x => {this.setState({response: x})})
            //sending me a boolean true if good false if no good
            //to test the emails and usernames
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
        // .then(x=> {console.log('this is what youre getting for cookies!!',x); return x})
        // .then(z => {this.props.history.push("/",z)})
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

//can we/ how do we use cookies here to bypass the loggin state?
    signingUp = () =>  {
        
        const { username , password, email} = this.state
        this.props.history.push("/main", {
            username: username, 
            password: password,
            email: email,
            loggedIn: true
        });
    }

    loggingIn = () =>    {

        const { username , password } = this.state
        this.props.history.push("/main", {
            username: username,
            password: password, 
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
