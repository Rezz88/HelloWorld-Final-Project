import React from "react";
import { Button } from '../styles';



class BarListComponent extends React.PureComponent {
  render() { 
    
    return (
      
      <ul className="bar-list">
        {this.props.venues.map( (venue, idx) => 
        <li className="bar-item" key={idx}>        
          <a 
            onMouseEnter={ (e) => this.props.handleHover(e, venue, idx)}
            onMouseOut={(e) => this.props.handleHoverOut(e, venue, idx)}
            >
            <Button onClick={() => this.props.toggleInfoWindow(venue)}>{venue.name}</Button>
          </a>
        </li>
        )}
      </ul>
    )
  }
}
// {this.props.valueList.map(x => <li> {x} </li>)}

export default BarListComponent