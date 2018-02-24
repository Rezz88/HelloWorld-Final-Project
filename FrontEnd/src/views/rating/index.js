import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom'; Not using link ATM
import '../../App.css';

class Rating extends Component {
    constructor() {
        super();
        this.state = {}
    }

    barData = () => {
        const { name, age, gender } = this.props.location.state.bar
        for(var i=0; i<this.props.location.state.length; i++) {

        }
    };


    renderBarInfo = () => {
        //Info will come from whatever bar they have selected
        const { barName, barRatio, barAge, barNum } = this.props.location.state
        return (
            <div> 
                <h4>Bar Info</h4>
                <div>{"barName: " + barName}</div>
                <div>{"barRatio: " + barRatio}</div>
                <div>{"barAge: " + barAge}</div>
                <div>{"barNum: " + barNum}</div>
            </div>
        )
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
        if (this.props.location.state.loggedIn === true ) {
            return (
                <div>
                    Rating page
                    {this.renderBarInfo()}
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