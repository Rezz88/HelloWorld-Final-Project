import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { Redirect } from 'react-router';
import MainMap from './map'
import gleb1 from './images/gleb1.png'
import payrez from './images/payrez.png'
import wash from './images/wash.png'
import marc from './images/marc.png'
import { constants, mediaSizes, MainFooter, FootBar } from '../styles';
import FlipClock from './Components/FlipClock'

const themeStyles = css`
${({ mapState }) => !mapState ?
'background-color: #404040; color: white; cursor: pointer;  border-radius: 5px; height: 1.7rem; width: 6.5rem; transition: background-color 3s, color 2s; margin-top: 16px;' :
'background-color: #f2f2f2; color: black; cursor: pointer;  border-radius: 5px; height: 1.7rem; width: 6.5rem; transition: background-color 2s;  color 3s; margin-top: 16px;'
};
`
// background-color: lightgrey; color: black;font-variant: small-caps; box-shadow: 0px 1px 5px grey;'

const NavThemeStyles = css`
${({ mapState }) => !mapState ?
'background-color: rgb(89, 89, 89); transition: background-color 3s, color 2s;' :
'background-color: whitesmoke; transition: background-color 2s;  color 3s;'
};
`
const textstyles = css`
${({ mapState }) => !mapState ?
'color: white; transition: background-color 3s, color 2s;' :
'color: black; transition: background-color 2s;  color 3s;'
};
`
const LastCall = styled.p`
${textstyles}
`

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const MainHeader = styled.h1`
${textstyles}
  margin: 0;
`;
const FixedWrapper = styled.div`
`;
// position: fixed;
// left: 0;
// right: 0;
// top: 0;
// z-index: 100;
// margin-bottom: 4rem;

const NavBar = styled.div`
  ${NavThemeStyles}
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${constants.boxShadow};
  padding: .5rem;
`;

const NavButton = styled.div`
${themeStyles};
`;

const NavButtonWrapper = styled.div`
  display: flex;
`;

const AboutProfile = styled.div`z
  display: flex;
  justify-content: space-around;
  min-height: 30px;
  margin-top: 4%;
  margin-bottom:4%;
`;
const AboutBar = styled.div`
  display: Flex;
  justify-content: space-around;
  ${NavThemeStyles}
  min-height: 30%;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding-top: 4%;
`;
const ProfileWrapper = styled.div`
  align-items: center;
  margin: auto;
  max-width: 50%;
`;
const ProfileBlurb = styled.div`
  width: 200px; 
`;

class Main extends Component {
  constructor() {
    super();
    this.state = {
      hoverBar: null,
      about: false,
      mapState: false
    };
  }

  ChangeTheme = (state) => {
    this.setState({mapState: !state})
    this.props.location.state.theme = !state
    console.log('theme',this.props.location.state.theme)
    console.log('mapstate', this.state.mapState)
  }

  toggleAbout = () => {
    this.setState({ about: !this.state.about })
  }


  render() {
    console.log('props ', this.props)
    //props.location.state is the login information originated at login/index.js
    console.log('Main page ', this.props.location.state)

    //for now the state is undefined unless someone logs in
    if (this.props.location.state && this.props.location.state.loggedIn === true) {
      return (
        <Wrapper>
          <FixedWrapper>
            <NavBar mapState={this.state.mapState}>
              <div className="div-flex">
              <MainHeader mapState={this.state.mapState}>WhatsLit</MainHeader>
              <div className="split">
              <img src="https://i.imgur.com/fSG9Cdt.png" height="30" width="35" />
              </div>
              </div>
              <div className="ttlc">
              <LastCall mapState={this.state.mapState} className="ttlc">L a s t - c a l l</LastCall>
              <FlipClock inverse={this.props.location.state.theme} />
              </div>  
              <NavButtonWrapper>
                <NavButton mapState={this.state.mapState} onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</NavButton>
              </NavButtonWrapper>
            </NavBar>
          </FixedWrapper>
          <MainMap ChangeTheme={this.ChangeTheme} />

          {this.state.about ?
            <AboutBar>
              <div>
                <img src={marc} height="150" width="150" />
                <div>
                  <a>Marc Renaud</a>
                  <div>
                    <a>Google Map API</a>
                  </div>
                </div>
              </div>
              <div>

                <img src={wash} height="150" width="150" />
                <div>
                  <a>Eric Washburn</a>
                  <div>
                    <a>Front-End(UI)</a>
                  </div>
                </div>
              </div>

              <div>
                <img src={payrez} height="150" width="150" />
                <div>
                  <a>Emmanuel Perez</a>
                  <div>
                    <a>Front-End</a>
                  </div>
                </div>
              </div>

              <div>
                <img src={gleb1} height="150" width="150" />
                <div>
                  <a>Gleb Dvinski</a>
                  <div>
                    <a>Back-End</a>
                  </div>
                </div>
              </div>
            </AboutBar>
            : null}

          <NavBar>
            <MainHeader onClick={this.toggleAbout}>about us</MainHeader>
          </NavBar>
        </Wrapper>
      )
    } else {
      return (
        <Redirect to="/" />
      )
    }
  }
}

export default Main;