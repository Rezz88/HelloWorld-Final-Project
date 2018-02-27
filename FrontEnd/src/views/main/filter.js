import React from "react";
import styled from 'styled-components';



const Wrapper = styled.div`
display: flex;
padding: .2rem;
  justify-content: space-between;
  `

  const Selectors = styled.select`
  background-color: #404040;
  color: white;
  `

  
  const ToggleButton = styled.button`
  
  ${({ mapState }) => {
    if (!mapState)  {return 'background-color: #404040; color: white'};
    return 'background-color: #f2f2f2; color: black';
  }};
`;

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
    var infoToSend = { value: this.state.value, hiOrLow: this.state.hiOrLow, placeIDs: placeIDs }
    console.log(infoToSend)
    fetch('/sort', {
      method: 'Get'
    }) .then(( response ) => response.json())
      .then((data) => console.log(data))
      .then(( data ) => this.props.setVenues(data))
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
          <Selectors onChange={this.handleChange}>
            <option value="people"># of People</option>
            <option value="avgAge">Average Age</option>
            <option value="ratio">Male Ratio</option>
          </Selectors>
          <Selectors onChange={this.handleValueChange}>
            <option value='high'>High</option>
            <option value='low'>Low</option>
          </Selectors>
          <button 
          // setVenues={this.props.setVenues}
          onClick={this.sendInfo}
          >Filter</button>
        </div>
      </Wrapper>
    )
  }
}

export default SortComponent