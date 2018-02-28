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
  ${ props  => {
    if (props.existCheck && !props.mapState) {
      return 'background-color: #404040; color: white';
    }
    if (!props.existCheck && !props.mapState) {
      return 'background-color: #f2f2f2; color: black';
    }
    if (props.existCheck && props.mapState) {
      return 'background-color: #404040; color: white';
    }
    if (!props.existCheck && props.mapState) {
      return 'background-color: #f2f2f2; color: black';
    }}
  }
    `;
    // background-color: ${ props  => props.existCheck && props.mapState ? 'blue' : 'yellow'};
    
class BarListComponent extends React.PureComponent {
  constructor() {
    super();
    this.state = { 
      isActive: -1,
      // mapState
    };
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
        // ourData={}
        existCheck={venue.exists}
        // mapState={props.mapState}
        onClick={() => {console.log(this.props.mapState); this.handleClick(venue, idx)}}
        onMouseEnter={(e) => this.props.handleHover(e, venue, idx)}
        onMouseOut={(e) => this.props.handleHoverOut(e, venue, idx)}
          // highlight={venue.genderRatio !== undefined}
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