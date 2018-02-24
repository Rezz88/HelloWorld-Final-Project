import BarListComponent from './barList'
import React from "react";
import { compose, withProps, withHandlers, withStateHandlers, lifecycle } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  OverlayView,
  InfoWindow,
  SearchBox
} from "react-google-maps";
// import { connect } from "tls";
import markerImage from './images/heatDot.png';
import markerHovered from './images/greenMarker.png';
import personImage from './images/user.png';
import testLogo from './images/firecircle.png';
import myMapStyles from "./mapStyle/style.js";

const PLACES_API_KEY = 'AIzaSyBA0wFPUwIo03AHcEf3pFarehPoQLzysCo';

var placeID;

const MyMapComponent = compose(

  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + PLACES_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div id="map" style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentDidMount() {
      const refs = {};
      this.setState({
        onMapMounted: ref => {
          refs.map = ref;
          this.props.showBars(refs.map, 6000);
        },
        showBars: (radius) => {
          this.props.showBars(refs.map, radius);
        },
        onMapZoom: () => {
          this.props.setZoom(refs.map.getZoom());
        }
      })
    },
  }),
  withHandlers({

    onMapClick: props => (e) => {
      // console.log(e.latLng.lat(), e.latLng.lng());
      // if (props.clickedBar){return}
      // props.userClickedBar(false)
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      props.setMarker(lat, lng);
      props.setCenter(lat, lng);
      if (props.zoom > 15) { props.setZoom(props.zoom) }
      else {
        props.setZoom(15);
      }
    },


    // seeHover: props => (e) => {
    //   console.log(e);
    // }

  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return <GoogleMap
    ref={props.onMapMounted}
    center={props.center}
    zoom={props.zoom}
    onZoomChanged={props.onMapZoom}
    options={{ streetViewControl: false, mapTypeControl: false, styles: myMapStyles }}
    onClick={props.onMapClick}
  >
    {props.marker && <Marker
      position={props.marker}
      onClick={() => { props.showBars(500); }}
      icon={personImage}
    // Animation={'DROP'}
    >
    </Marker>}
    {props.infoWindow && <InfoWindow
      position={{ 
        lat: props.venueData.geometry.location.lat(), 
        lng: props.venueData.geometry.location.lng() 
      }}
      onCloseClick={props.closeInfoWindow}>
      <div className="info-window">
        <div>Name: {props.venueData.name}</div>
        <div>People: {props.venueData.people || ''}</div>
        <div>AgeAvg: {props.venueData.averageAge}</div>
      </div>
    </InfoWindow>}
    {props.venues.length > 0 && props.venues.map((venue, idx) => {
      return (
        <OverlayView
          key={idx}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{ lat: venue.geometry.location.lat(), lng: venue.geometry.location.lng() }}
        >
          <div
            // onMouseOver={() => console.log(venue.name)}
            onClick={() =>props.fetchVenueData(venue)}
            onMouseEnter={() => props.fetchVenueData(venue)} 
            onMouseLeave={() => props.closeInfoWindow()}
            
            className="bar-marker"
          ><img src={(props.zoom <= 14 || venue.hover) ? markerImage : markerHovered} />
          </div>
        </OverlayView>);
    }
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
    infoWindow: false,
    venueData: null,
    barShowing: null,
    clickedBar: false,
  }


  componentDidMount() {
    //get user location
    //update state (this.setState) with location and pass props to MyMapComponent
    this.getUserLocation()
      .then(coords => this.setCenter(coords.lat, coords.lng));
  }

  getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((e) => {
        resolve({ lat: e.coords.latitude, lng: e.coords.longitude });
      });
    });
  }

  showBars = async (map, radius) => {
    const { marker, center } = this.state;
    this.setState({ barShowing: true })
    let location = marker ? marker : center;
    if (!location) {
      location = await this.getUserLocation();
    }
    console.log(this.props, location);
    const google = window.google;
    var service = new google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    service.nearbySearch({
      location,
      radius: radius,
      type: ['bar']
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // console.log(results);
        this.setVenues(results);
      }
    });
  }

  toggleInfoWindow = (venue) => { 
    const { venueData, infoWindow } = this.state;
    if (venueData && venue.name === venueData.name) {
      this.setState({ infoWindow: !infoWindow });
    } else { 
      this.fetchVenueData(venue);
    }
  }



  closeInfoWindow = () => {
    this.setState({ infoWindow: false });
  }

  //talking to Bk Function
  fetchVenueData = (venueData) => {
    fetch(`/bar-stats/${venueData.place_id}`, {
      method: 'Get',
    }).then((response) => response.json())
      .then(data => {
        console.log(data);
        if (Object.keys(data).length) {
          console.log('data', data);
          this.setState({ infoWindow: true, venueData: { ...venueData, ...data } });
        } else {
          console.log('venue', venueData);
          this.setState({ infoWindow: true, venueData });
        }
        return;
      })
      .catch((err) => {
        console.log('error', err);
      });
    };


    //********TO FIX for the info window to display Bar Data */
    // .then(x => this.setState({infoWindow: x}))
    //setstate...

  userClickedBar = () => {
    console.log(this.state.clickedBar)
    this.setState({ marker: null })
  }

  setCenter = (lat, lng) => {
    this.setState({ center: { lat, lng } });
  }

  setMarker = (lat, lng) => {
    this.setState({ marker: { lat, lng } });
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
    this.setState({ venues: newVenues })
  }

  handleMouseOut = (event, venue, idx) => {
    // console.log('hover handleMouseOut', venue, idx)
    let newVenues = this.state.venues.slice();
    newVenues[idx].hover = false;
    this.setState({ venues: newVenues })
  }

  render() {
    return (
      <div className='container'>
        <div className='map-content'>
          <MyMapComponent
            //state
            zoom={this.state.zoom}
            marker={this.state.marker}
            center={this.state.center}
            venues={this.state.venues}
            infoWindow={this.state.infoWindow}
            venueData={this.state.venueData}
            barShowing={this.state.barShowing}
            clickedBar={this.state.clickedBar}
            //functions
            onBarClick={this.barClick}
            setMarker={this.setMarker}
            setZoom={this.setZoom}
            setCenter={this.setCenter}
            closeInfoWindow={this.closeInfoWindow}
            showBars={this.showBars}
            userClickedBar={this.userClickedBar}
            fetchVenueData={this.fetchVenueData}
          />
        </div>
          <BarListComponent
            //state
            venues={this.state.venues}
            infoWindow={this.state.infoWindow}
            //functions
            handleHover={this.handleMouseOver}
            handleHoverOut={this.handleMouseOut}
            toggleInfoWindow={this.toggleInfoWindow}
          />
      </div>

    )
  }
}

export default MyFancyComponent
