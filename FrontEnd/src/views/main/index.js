import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import MainMap from './map'
import gleb1 from './images/gleb1.png'
import payrez from './images/payrez.png'
import wash from './images/wash.png'
import marc from './images/marc.png'
import { MainHeader, constants, mediaSizes, MainFooter, FootBar } from '../styles';

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${constants.boxShadow};
  margin-bottom: .5rem;
  padding: .5rem;
  background-color: white;
`;

const NavButton = styled.div`
  cursor: pointer;
  margin-right: 1rem;
  @media (min-width: ${mediaSizes.sm}px) {
    color: black;
    background-color: lightgrey;
    font-variant: small-caps; 
    box-shadow: ${constants.boxShadow};
  }
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
  min-height: 40vh;
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
      about: false
      };
  }

  toggleAbout = () => {
    this.setState({about: !this.state.about})
  }

  render() {
    console.log(this.props)
    //props.location.state is the login information originated at login/index.js
    console.log('Main page ', this.props.location.state)
    //for now the state is undefined unless someone logs in
    if (this.props.location.state.loggedIn === true) {
      return (
        <Wrapper>
          <FixedWrapper>
            <NavBar>
              <div className="div-flex">
              <MainHeader>WhatsLit</MainHeader>
              <div className="split">
              <img src="https://i.imgur.com/fSG9Cdt.png" height="30" width="35" />
              </div>
              </div>
              <NavButtonWrapper>
                <NavButton onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</NavButton>
              </NavButtonWrapper>
            </NavBar>
          </FixedWrapper>
          <MainMap />
            
              {this.state.about ? 
                <AboutBar> 
                  <ProfileWrapper>
                  <AboutProfile>
                    <img src={marc} height="60" width="60"/>
                    <ProfileBlurb>
                      <div>
                      MARC RENAUD
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
                      GLEB DVINSKI
                      </div>
                      <div>
                      Back-End
                      </div>
                    </ProfileBlurb>
                  </AboutProfile>
                  </ProfileWrapper>
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