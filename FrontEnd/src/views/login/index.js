import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import '../../App.css';


class Login extends Component {
    render() {
        return (
            <div>
                this is the login
            <div>
                    <Link to="/"> main locations </Link>
                </div>
                <div>
                    <Link to="/profile"> profile </Link>
                </div>
                <div>
                        <div>
                            <input placeholder="Username" ></input>
                        </div>
                        <div>
                            <input placeholder="Password"></input>
                        </div>
                        <div>
                            <input placeholder="Email"></input>
                        </div>
                        <button>Sign up</button>
                        <button>Login</button>
                        {/* {this.state.list.map(x => <li>{x}</li>)} */}
                        <div>
                            {}
                        </div>
                </div>
            </div>

        );
    }
}

export default Login;