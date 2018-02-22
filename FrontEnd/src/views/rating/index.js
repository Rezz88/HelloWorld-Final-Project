import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Rating extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        console.log('Rating page ', this.props.location.state)
        //for now the state is undefined unless someone logs in
        if (this.props.location.state !== undefined) {
            return (
                <div>
                    Rating page
                <div>
                        <button onClick={() => this.props.history.push("/main", this.props.location.state)}>Bar Map </button>
                    </div>
                </div>
            );
        } else {
            return (
                <Redirect to="/" />
            )
        }
    }
}

export default Rating;