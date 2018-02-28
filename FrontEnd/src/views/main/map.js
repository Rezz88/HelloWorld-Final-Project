import BarListComponent from './barList'
import SortComponent from './filter'
import React from "react";
import styled, {css} from 'styled-components';
import { constants, mediaSizes } from '../styles.js'
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
import heatDot from './images/heatDot.png';
import redFlame from './images/lit.png';
import notLit from './images/not-lit.png'
import markerHovered from './images/greenMarker.png';
import personImage from './images/user.png';
import darkUser from './images/darkUser.png'
import testLogo from './images/firecircle.png';
import darkMapStyles from "./mapStyle/dark.js";
import lightStyles from "./mapStyle/light.js"

const PLACES_API_KEY = 'AIzaSyBA0wFPUwIo03AHcEf3pFarehPoQLzysCo';


const ThemeStyles = css`
${({ mapState }) => !mapState ?
'background-color: rgb(30, 30, 30); transition: background-color 3s;' :
'background-color: whitesmoke; transition: background-color 3s;'
};
`

const StyledInfoWindow = styled.div`
  max-width: 200px;
  font-family: arial;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 25%;
  height: 25%;
`;

const PeopleMetric = styled.div`
  padding: .5rem;
  padding-left: 0;
`;

const BarCapacity = styled.div`
  width: ${({ capacityRatio }) => capacityRatio}%;
  height: .5rem;
  background-color: ${({ capacityRatio }) => {
    if (capacityRatio < 25) {
      return 'green';
    }
    if (capacityRatio > 25 && capacityRatio <= 50) {
      return 'yellow';
    }
    if (capacityRatio > 50 && capacityRatio <= 75) {
      return 'orange';
    }
    if (capacityRatio > 75 && capacityRatio < 101) {
      return 'red';
    }
    if (capacityRatio > 100) {
      return 'black';
    }
  }};
  transition: width 2s
`;

// width: ${({averageAge}) => {
const BarAvgAge = styled.div`
  width: ${({ averageAge }) => {
    if (averageAge <= 20) {
      return '15%'
    }
    if (averageAge >= 21 && averageAge <= 28) {
      return '30%'
    }
    if (averageAge > 28 && averageAge < 35) {
      return '60%'
    }
    if (averageAge > 35) {
      return '85%'
    }
  }};
  height: .5rem;  
  background-color: ${({ averageAge }) => {
    if (averageAge < 20) {
      return 'red';
    }
    if (averageAge > 21 && averageAge <= 28) {
      return 'blue';
    }
    if (averageAge > 28 && averageAge < 35) {
      return 'green';
    }
    if (averageAge > 35) {
      return 'grey'
    }
  }};
  transition: width 2s;
`;

const GenderWrapper = styled.div`
display: flex;
align-items: center;
font-size: 18px;
font-weight: bold;
background: pink;
`;

const Ratio = styled.div`
  width: ${({ genderRatio }) => genderRatio}%;
  height: .5rem;
  background-color: blue;
  transition: width 2s
`;


const BarWrapper = styled.div`
  box-shadow: 0px 0px 0px 1px black;
  width: 95%;
  margin: 5px auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
`;

const Container = styled.div`
  ${ThemeStyles};
  display: flex;
  flex: 1;
  flex-direction: column;
  @media(min-width: ${mediaSizes.sm}px) {
    flex-direction: row;
  }
`

const MapContent = styled.div`
  width: 100%;
  @media(min-width: ${mediaSizes.sm}px) {
    width: 60%;
  }
`;

const MyMapComponent = compose(

  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + PLACES_API_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `91%` }} />,
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
      // if (props.clickedBar){return};
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      props.setMarker(lat, lng);
      props.setCenter(lat, lng);
      if (props.zoom > 15) { props.setZoom(props.zoom) }
      else {
        props.setZoom(15);
      }
    },

  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return <GoogleMap
    ref={props.onMapMounted}
    center={props.center}
    zoom={props.zoom}
    // center={ {lat: 45.49914093562442, lng: -73.57023796767328}}
    // zoom={14}
    onZoomChanged={props.onMapZoom}
    options={{
      streetViewControl: false, mapTypeControl: false,
      styles: props.mapState ? lightStyles : darkMapStyles 
    }}
    onClick={props.onMapClick}
  >
    {props.marker && <Marker
      position={props.marker}
      onClick={() => { props.showBars(500); }}
      icon={
        props.mapState ? darkUser : personImage}
    
    >
    </Marker>}
    {props.infoWindow && <InfoWindow
      position={{
        lat: props.venueData.geometry.location.lat,
        lng: props.venueData.geometry.location.lng
      }}
      onCloseClick={props.closeInfoWindow}>
      <StyledInfoWindow>
        <TitleWrapper>
          <Icon src={props.venueData.icon} alt='icon' />
          <div>{props.venueData.name}</div>
        </TitleWrapper>
        {
          props.venueData.people !== 0 ?
            <PeopleMetric>
              <BarWrapper>
                <BarCapacity capacityRatio={props.venueData.people &&  (props.venueData.people / 150) *100} />
              </BarWrapper>
              <div> People: {props.venueData.people || ''}</div>
              <BarWrapper>
                <BarAvgAge averageAge={props.venueData.averageAge} />
              </BarWrapper>
              <div> AgeAvg: {props.venueData.averageAge || ''}</div>
              <GenderWrapper>
                <Ratio genderRatio={props.venueData.ratio.femalePercent} />
              </GenderWrapper>
              <div> Ratio: {props.venueData.ratio.femalePercent || ''}</div>
            </PeopleMetric>
            :
            <div>*No whatslit users</div>
        }
      </StyledInfoWindow>
    </InfoWindow>}
    {props.venues.length > 0 && props.venues.map((venue, idx) => {
      return (
        <OverlayView
          key={idx}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          position={{ lat: venue.geometry.location.lat, lng: venue.geometry.location.lng }}
        >
          <div
            // onMouseOver={() => console.log(venue.name)}
            // onClick={() => props.infoWindow && props.venueDate.name === venue.name
            // ? props.closeInfoWindow() : props.fetchVenueData(venue) }
            onClick={() => props.barClick()}
            onMouseEnter={() => props.fetchVenueData(venue)}
            onMouseLeave={() => props.closeInfoWindow()}

            className="bar-marker"
          >
          {/* <img src={(props.zoom <= 14 || venue.hover) ? markerImage : markerHovered} /> */}
          <img src={(props.zoom <= 14 ? heatDot : (venue.hover ? heatDot : (!venue.exists ? notLit : redFlame)))} />
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
    mapState: false,
    userLoc: null,
    ourVenues: null
  }


  componentDidMount() {

    // get user location
    // update state (this.setState) with location and pass props to MyMapComponent
    this.getUserLocation()
      .then(coords => this.setCenter(coords.lat, coords.lng));
  }

  getUserLocation = () => {
    // {lat: 45.49914093562442, lng: -73.57023796767328}
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((e) => {
        let loc = { lat: e.coords.latitude, lng: e.coords.longitude };
        this.setState({userLoc: loc})
        resolve(loc);
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

    if(map){
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
        if (Object.keys(data).length) {
          this.setState({ infoWindow: true, venueData: { ...venueData, ...data } });
        } else {
          this.setState({ infoWindow: true, venueData });
        }
        return;
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  barClick = () => {
    this.setState({ clickedBar : true })
    this.setState({ marker: null })
    
  }
  
  mapClick = () => {
    this.setState({clickedBar: false})
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
    console.log('in venues: ', venues)
    this.setState({ venues });
    
    
    fetch('/exists', {
      method: 'Post',
      body: JSON.stringify(this.state.venues)
    }) .then(( response ) => response.json())
    .then(data => { this.setState({venues: data} );
    })

    console.log(this.state.venues)
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


  toggleMap = () => {
    this.setState({ mapState: !this.state.mapState })
    this.props.ChangeTheme(this.state.mapState)
  }

  sortVenues = (data) => {
  
    var res = []

    for (var i = 0; i < data.length; i++) {
      
      this.state.venues.forEach((item, pos) => {
        if (item.place_id === data[i]) {
          res.push(item);
        }  
      });
    }

    this.setState({venues: res})

  }

  render() {
    
    return (
      <Container mapState={this.state.mapState}>
        <MapContent>
          <SortComponent
            //state
            venues={this.state.venues}
            mapState={this.state.mapState}

            //functions
            toggleMap={this.toggleMap}
            sortVenues={this.sortVenues}
          />
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
            mapState={this.state.mapState}
            //functions
            barClick={this.barClick}
            mapClick={this.mapClick}
            setMarker={this.setMarker}
            setZoom={this.setZoom}
            setCenter={this.setCenter}
            closeInfoWindow={this.closeInfoWindow}
            showBars={this.showBars}
            fetchVenueData={this.fetchVenueData}
            toggleMap={this.toggleMap}
          />
        </MapContent>
        <BarListComponent
          //state
          venues={this.state.venues}
          infoWindow={this.state.infoWindow}
          userLoc={this.state.userLoc}
          mapState={this.state.mapState}
          //functions
          handleHover={this.handleMouseOver}
          handleHoverOut={this.handleMouseOut}
          toggleInfoWindow={this.toggleInfoWindow}
        />
      </Container>

    )
  }
}

export default MyFancyComponent
