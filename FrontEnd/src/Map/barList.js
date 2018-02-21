import React from "react";

class BarListComponent extends React.PureComponent {
  render() { 
    return (
      <div>
        {this.props.venues.map(venue => 
        <li>        
        <a href>{venue.name}</a>
        </li>
        )}
      </div>
    )
  }
}
// {this.props.valueList.map(x => <li> {x} </li>)}

export default BarListComponent