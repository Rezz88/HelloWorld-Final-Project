import React from "react";
import styled from 'styled-components';

class SortComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      value: 'people',
      hiOrLow: 'high'
    }
  }
  sendInfo = () => {

    var placeIDs = []
    
    this.props.venues.forEach((item, pos) => {
      if (item.place_id) {
        placeIDs.push(item.place_id)
      }
    });
    var infoToSend = {value: this.state.value, hiOrLow: this.state.hiOrLow, placeIDs: placeIDs}
    console.log(infoToSend)
    //Potential solution...
    //fetch sortedVenues and call this.props.setVenues to update parent state and replace venues array
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleValueChange = (event) => {
    this.setState({ hiOrLow: event.target.value });
  }

  render() {
    return (
      <div>
        <select onChange={this.handleChange}>
          <option value="people"># of People</option>
          <option value="avgAge">Average Age</option>
          <option value="ratio">Male Ratio</option>
        </select>
        <select onChange={this.handleValueChange}>
          <option value='high'>High</option>
          <option value='low'>Low</option>
        </select>
        <button onClick={this.sendInfo}>Filter</button>
      </div>
    )
  }
}

export default SortComponent