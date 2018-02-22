import React, { Component } from 'react';
import './App.css';
import MyFancyComponent from './map'

//NPM INSTALL
//npm install --save react-google-maps
//?? maybe recompose
// import { connect } from "tls"; NOT USED YET

class App extends Component {
  constructor() {
    super();
    this.state = { hoverBar: null };
  }
  // setHoverBar = (bar) => {
  //   this.setState({ bar });
  // }
  render() {
    return (
      <div className="App">
        <div style={{width: 300, height: 600}}>
         <MyFancyComponent />
         {/* <BarList hoverBar={this.state.hoverBar} setHoverBar={this.setHoverBar} /> */}
        </div>
      </div>
    );
  }
}

export default App;
// isMarkerShown 