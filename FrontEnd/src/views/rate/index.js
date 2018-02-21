import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Rate extends Component {
    constructor()   {
        super();
        this.state = {}
    }

    render() {
        console.log(this.props.location.state)
        return (
            <div>
                Rating page
                <div>
                    <button onClick={() => this.props.history.push("/", this.props.location.state)}>Bar Map </button>
                </div>
            </div>
        );
    }
}

export default Rate;