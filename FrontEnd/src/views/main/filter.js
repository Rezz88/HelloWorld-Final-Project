import React from "react";
import styled, { css } from 'styled-components';
import FlipClock from './Components/FlipClock'


const Wrapper = styled.div`
display: flex;
padding: .2rem;
justify-content: space-between;
`

const themeStyles = css`
${({ mapState }) => !mapState ?
'background-color: #404040; color: white; cursor: pointer;  border-radius: 5px; height: 1.7rem; width: 6.5rem; transition: background-color 3s, color 2s; margin-top: 16px;' :
'background-color: #f2f2f2; color: black; cursor: pointer;  border-radius: 5px; height: 1.7rem; width: 6.5rem; transition: background-color 2s;  color 3s; margin-top: 16px;'
};
`

//avoid the copy pasting
const Selectors = styled.select`
${themeStyles}
`

//also apply this styling to all buttons
const ToggleButton = styled.button`
${themeStyles}
`;

const FilterButton = styled.button`
  cursor: pointer;
  background-color: #404040;
  color: white;
  border-radius: 5px;
  height: 1.7rem;
  width: 4rem;
`;

class SortComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      value: 'people',
      hiOrLow: 'high',
    }
  }
  sendInfo = () => {

    var placeIDs = []

    this.props.venues.forEach((item, pos) => {
      if (item.place_id) {
        placeIDs.push(item.place_id)
      }
    });
    var infoToSend = { value: this.state.value, hiOrLow: this.state.hiOrLow, placeIDs: placeIDs }
    console.log(infoToSend)
    fetch('/sort', {
      method: 'Post',
      body: JSON.stringify(infoToSend)
    }).then((response) => response.json())
      // .then((data) => console.log(data))
      .then((data) => this.props.sortVenues(data))

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
      <Wrapper>
        <div>
          <ToggleButton
            mapState={this.props.mapState}
            onClick={this.props.toggleMap}>Toggle Map</ToggleButton>
        </div>
        <div>
          <Selectors mapState={this.props.mapState} onChange={this.handleChange}>
            <option value="people"># of People</option>
            <option value="avgAge">Average Age</option>
            <option value="ratio">Male Ratio</option>
          </Selectors>
          <Selectors mapState={this.props.mapState} onChange={this.handleValueChange}>
            <option value='high'>High</option>
            <option value='low'>Low</option>
          </Selectors>
          <ToggleButton
          mapState={this.props.mapState}
            onClick={this.sendInfo}
          >Filter</ToggleButton>
        </div>
      </Wrapper>
    )
  }
}

export default SortComponent