import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Rate extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                Rating page
                <div>
                    <button onClick={() => this.props.history.push("/")}>Bar Map </button>
                </div>
            </div>
        );
    }
}

export default Rate;