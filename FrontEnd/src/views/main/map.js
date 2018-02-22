import BarListComponent from './barList'
import React from "react";
import { compose, withProps, withHandlers } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { connect } from "tls";
import markerImage from './images/heatDot.png';
import markerHovered from './images/greenMarker.png';
import personImage from './images/greenMarker.png';

const PLACES_API_KEY = 'AIzaSyBA0wFPUwIo03AHcEf3pFarehPoQLzysCo';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + PLACES_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div id="map" style={{ height: `100%` }} />,
  }),
  withHandlers({
    showBars: props => (map) => {
      const { marker, setVenues } = props;
      const google = window.google;
      var service = new google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
      service.nearbySearch({
          location: marker,
          radius: 500,
          type: ['bar']
        }, callback);
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(results);
          setVenues(results);
        }
      }
    },
    onBarClick: props => (e, venueData) => {
       console.log('hey', venueData);
    },
    onMapClick: props => (e) => {
      // console.log(e.latLng.lat(), e.latLng.lng());
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      props.setMarker(lat, lng);
      props.setCenter(lat, lng);
      props.setZoom(15);
    },

    // seeHover: props => (e) => {
    //   console.log(e);
    // }
  
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return <GoogleMap
    ref={(ref) => this.map = ref}
    center={props.center}
    zoom={props.zoom}
    options={{streetViewControl: false, mapTypeControl: false, Icon: './images/flame.png'}}
    onClick={props.onMapClick}
  >
  
    {props.marker && <Marker 
    position={props.marker} 
    onClick={() => props.showBars(this.map)} 
    icon={personImage}
    // Animation={'DROP'}
    />}
    {props.venues.length > 0 && props.venues.map((venue, idx) => 
      <Marker 
      onMouseOver={() => console.log(venue.name)}
      // options={console.log(this.map)} 
      key={idx}
      position={{ lat: venue.geometry.location.lat(), lng: venue.geometry.location.lng()}} 
      onClick={ (e) => props.onBarClick(e, venue)}
      // style={{color: props.hoverBar === venue ? 'red' : "yellow"}}
      // onMouseEnter={() => props.onHoverBar(venue)}
      icon={venue.hover?markerHovered:markerImage}
      title={venue.name}
    />
    
   )}
  </GoogleMap>
}

)

class MyFancyComponent extends React.PureComponent {
  state = {
    marker: null,
    zoom: 12,
    center: null,
    venues: [],
  }

  componentDidMount() {
    //get user location
    //update state (this.setState) with location and pass props to MyMapComponent
    navigator.geolocation.getCurrentPosition((e) => {
      this.setCenter(e.coords.latitude, e.coords.longitude);
    
    // seeHover = (e) => {
    //   console.log(e);
    // }
    });
  }

  setCenter = (lat, lng) => {
    this.setState({center: { lat, lng }});
  }

  setMarker = (lat, lng) => {
    this.setState({ marker: { lat, lng }});
  }

  setZoom = (zoom) => {
    this.setState({ zoom });
  }

  setVenues = (venues) => {
    // console.log('in venues: ', venues)
    this.setState({ venues });
  }
  handleMouseOver = (event, venue, idx) => {
    // console.log('hover event', venue, idx)
    let newVenues = this.state.venues.slice();
    newVenues[idx].hover = true;
    this.setState({venues: newVenues})
  }
  handleMouseOut = (event, venue, idx) => {
    // console.log('hover handleMouseOut', venue, idx)
    let newVenues = this.state.venues.slice();
    newVenues[idx].hover = false;
    this.setState({venues: newVenues})
  }
  render() {
    return (
      <div className='fancy'>
      <button onClick={this.handleClick}>TESTING</button>
        <MyMapComponent
          zoom={this.state.zoom}
          marker={this.state.marker}
          center={this.state.center}
          onBarClick={this.barClick}
          venues={this.state.venues}
          setVenues={this.setVenues}
          setMarker={this.setMarker}
          setZoom={this.setZoom}
          setCenter={this.setCenter}
        />
        <BarListComponent
          venues={this.state.venues}
          handleHover={this.handleMouseOver}
          handleHoverOut={this.handleMouseOut}
          />
      </div>

    )
  }
}

export default MyFancyComponent
