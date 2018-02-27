import React from "react";
import styled from 'styled-components';
import { Button } from '../styles';

const BarList = styled.div`
  flex: 1;
  overflow-y: scroll;
  text-align: center;
  padding: 20px;
`;

const BarItem = styled(Button)`
  margin: 10px;
  font-size: 14px;
  padding: .5rem;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

class BarListComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = { isActive: -1 };
  }
  handleClick = (venue, idx) => {
    this.props.toggleInfoWindow(venue);
    this.setState({ isActive: idx });
  }
  render() { 
    return (
      
      <BarList>
        {this.props.venues.map((venue, idx) => 
        <BarItem
          key={idx}
          onClick={() => this.handleClick(venue, idx)}
          onMouseEnter={(e) => this.props.handleHover(e, venue, idx)}
          onMouseOut={(e) => this.props.handleHoverOut(e, venue, idx)}
          // highlight={venue.genderRatio}
        >        
          {venue.name}
          <div>
          {/* `https://www.google.com/maps?saddr=${this.props.userLoc}&daddr=${encodeURI(venue.vicinity)}` */}
          {/* http://maps.google.com/?q=${encodeURI(venue.vicinity)} */}
            <a href={`https://www.google.com/maps/dir/${this.props.userLoc.lat},${this.props.userLoc.lng}/${encodeURI(venue.vicinity)}`} 
            target="_blank">{this.state.isActive === idx ? venue.vicinity : ''}</a>
          </div>
        </BarItem>
        )}
      </BarList>
    )
  }
}
// {this.props.valueList.map(x => <li> {x} </li>)}

export default BarListComponent