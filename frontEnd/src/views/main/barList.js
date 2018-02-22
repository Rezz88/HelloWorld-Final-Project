import React from "react";



class BarListComponent extends React.PureComponent {
  render() { 
    
    return (
      
      <ul>
        {this.props.venues.map( (venue, idx) => 
        <li>        
          <a 
            onMouseEnter={ (e) => this.props.handleHover(e, venue, idx)}
            onMouseOut={(e) => this.props.handleHoverOut(e, venue, idx)}
            >
            {venue.name}
          </a>
        </li>
        )}
      </ul>
    )
  }
}
// {this.props.valueList.map(x => <li> {x} </li>)}

export default BarListComponent