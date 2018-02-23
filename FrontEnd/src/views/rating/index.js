import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Rating extends Component {
    constructor() {
        super();
        this.state = {}
    }

    renderBarInfo = () => {
        //Info will come from whatever bar they have selected
        const { barName, barRatio, barAge, barNum } = this.props.location.state
        return (
            <div> Bar History
                <div>{"barName: " + barName}</div>
                <div>{"barRatio: " + barRatio}</div>
                <div>{"barAge: " + barAge}</div>
                <div>{"barNum: " + barNum}</div>
            </div>
        )
    };

    renderRating = () => {
        //User will be able to render their rating
    };

    renderMainButton = () => {
        return (
            <div>
                <button onClick={() =>
                    this.props.history.push("/main", this.props.location.state)}>Bar Map </button>
            </div>
        )
    };

    render() {
        console.log('Rating page ', this.props.location.state)
        //for now the state is undefined unless someone logs in
        if (this.props.location.state !== undefined) {
            return (
                <div>
                    Rating page
                    {this.renderMainButton()}
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