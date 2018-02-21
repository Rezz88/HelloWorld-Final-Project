import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
// import '../../App.css';


// handleClick = () => {
//     this.props.history.push('/');
// }

class Login extends Component {
    constructor()   {
        super();
        this.state = {
            username: 'wash',
            password: 'password'
        }
    }

    render() {
        const { username, password, email } = this.state
        
        return (
            <form action="/sing-up" method="post">
                Username
                <input placeholder="Username" value={username} onChange={(e)=> {this.setInputValue('username', e.target.value)}}></input>
                Password
                <input placeholder="Password" type="password" value={password} onChange={(e)=> this.setInputValue('password', e.target.value)}></input>
                <button type="submit" >Submit</button>
            </form>
            




            // <div>
            //     this is the login
            //     <div>
            //         <Link to="/"> main locations </Link>
            //     </div>
            //     <div>
            //         <Link to="/profile"> profile </Link>
            //     </div>
            //     <div>
            //             <div>
            //                 <input placeholder="Username" ></input>
            //             </div>
            //             <div>
            //                 <input placeholder="Password"></input>
            //             </div>
            //             <div>
            //                 <input placeholder="Email"></input>
            //             </div>
            //             <button onClick>Sign up</button>
            //             <button>Login</button>
            //             {/* {this.state.list.map(x => <li>{x}</li>)} */}
            //             <div>
            //                 {}
            //             </div>
            //     </div>
            // </div>

        );
    }
}

export default Login;