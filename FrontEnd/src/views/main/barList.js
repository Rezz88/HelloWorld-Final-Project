import React from "react";
import styled from 'styled-components';
import { Button } from '../styles';

const BarList = styled.div`
  flex: 1;
  overflow-y: scroll;
  text-align: center;
`;

const BarItem = styled.div`
  font-size: 14px;
  padding: .5rem;
  cursor: pointer;
`;

class BarListComponent extends React.PureComponent {
  render() { 
    
    return (
      
      <BarList>
        {this.props.venues.map((venue, idx) => 
        <BarItem key={idx}>        
          <a 
            onMouseEnter={ (e) => this.props.handleHover(e, venue, idx)}
            onMouseOut={(e) => this.props.handleHoverOut(e, venue, idx)}
            >
            <Button onClick={() => this.props.toggleInfoWindow(venue)}>{venue.name}</Button>
          </a>
        </BarItem>
        )}
      </BarList>
    )
  }
}
// {this.props.valueList.map(x => <li> {x} </li>)}

export default BarListComponent