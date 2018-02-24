import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router';
import MainMap from './map'
import { MainHeader, constants, mediaSizes } from '../styles';

const Wrapper = styled.div``;

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${constants.boxShadow};
  margin-bottom: .5rem;
  padding: .5rem;
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

  barInfo = () => {
    //Function will take the bar info and push the info to the rating page
  };


  render() {
    console.log(this.props)
    //props.location.state is the login information originated at login/index.js
    console.log('Main page ', this.props.location.state)
    //for now the state is undefined unless someone logs in
    if (this.props.location.state.loggedIn === true) {
      return (
        <Wrapper>
          <NavBar>
            <MainHeader>WhatsLit</MainHeader>
            <NavButtonWrapper>
              <NavButton onClick={() => this.props.history.push("/profile", this.props.location.state)}>Your Profile</NavButton>
              <NavButton onClick={() => this.props.history.push("/ratings", this.props.location.state)}>Rating </NavButton>
            </NavButtonWrapper>
          </NavBar>
          <MainMap />
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