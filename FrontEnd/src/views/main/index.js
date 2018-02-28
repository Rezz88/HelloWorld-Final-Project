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
  margin-bottom: .5rem;
  padding: .5rem;
`;

const NavButton = styled.div`
${themeStyles};
`;



const NavButtonWrapper = styled.div`
  display: flex;
  
`;

const AboutProfile = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 30px;
  margin-top: 4%;
  margin-bottom:4%;
`

const AboutBar = styled.div`
  ${NavThemeStyles}
  min-height: 30%;
  align-items: center;
  text-align: center;
  vertical-align: middle;
`
const ProfileWrapper = styled.div`
  align-items: center;
  margin: auto;
  max-width: 50%;

`
const ProfileBlurb = styled.div`
  width: 200px; 
`

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
    this.setState({about: !this.state.about})
  }

  render() {
    console.log('props ',this.props)
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
          <MainMap ChangeTheme={this.ChangeTheme}/>
            
              {this.state.about ? 
                <AboutBar> 
                  <ProfileWrapper>
                  <AboutProfile>
                    <img src={marc} height="60" width="60"/>
                    <ProfileBlurb>
                      <div>
                      Marc Renaud
                      </div>
                      <div>
                      Front-End (Google API's)
                      </div>
                      </ProfileBlurb>
                  </AboutProfile>
                  <AboutProfile>
                    <img src={wash} height="60" width="60"/>
                    <ProfileBlurb>
                      <div>
                      Eric Washburn
                      </div>
                      <div>
                      Front-End (UI)
                      </div>
                    </ProfileBlurb>
                  </AboutProfile>
                  <AboutProfile>
                    <img src={payrez} height="60" width="60"/>
                    <ProfileBlurb>
                      <div>
                      Emmanuel Perez
                      </div>
                      <div>
                      Front-End
                      </div>
                    </ProfileBlurb>
                  </AboutProfile>
                  <AboutProfile>
                    <img src={gleb1} height="60" width="60" />
                    <ProfileBlurb>
                    <div>
                      Gleb Dvinski
                      </div>
                      <div>
                      Back-End
                      </div>
                    </ProfileBlurb>
                  </AboutProfile>
                  </ProfileWrapper>
                </AboutBar> 
              : null}
            
          <NavBar mapState={this.state.mapState}>
            <MainHeader mapState={this.state.mapState} onClick={this.toggleAbout}>about us</MainHeader>
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