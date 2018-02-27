import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import MainMap from './map'
import { MainHeader, constants, mediaSizes, MainFooter, FootBar } from '../styles';

const Wrapper = styled.div``;

const FixedWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  margin-bottom: 4rem;
`;

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
    color: red;
  }
`;

const NavButtonWrapper = styled.div`
  display: flex;
`;

class Main extends Component {
  constructor() {
    super();
    this.state = { hoverBar: null };
  }

  componentDidMount = () => {
    this.props.location.state.bar = [

      {name: "Fredo",
       age: 29,
       gender: "Male"
      },

      {name: "Annie",
       age: 27,
       gender: "Female"
      }
    ]
  };

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
              <MainHeader>WhatsLit</MainHeader>
              <NavButtonWrapper>
                <NavButton onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</NavButton>
              </NavButtonWrapper>
            </NavBar>
          </FixedWrapper>
          <MainMap/>
          <FootBar>
              <MainFooter>WhatsLit</MainFooter>
          </FootBar>
        </Wrapper>
      )
    } else {
      return (
        <Redirect to="/"/>
      )
    }
  }
}

export default Main;