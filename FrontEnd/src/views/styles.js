import styled from 'styled-components';

export const constants = {
  boxShadow: `0px 1px 5px grey`,
}

export const mediaSizes = {
  xs: 360,
  sm: 600,
  md: 920,
  lg: 1280,
  xl: 1600
};

export const Button = styled.div`
  font-style: bold;
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 8px;
  box-shadow: ${constants.boxShadow};
`;

export const MainHeader = styled.h1`
  margin: 0;
  font-variant: small-caps
`;
export const FootBar = styled.div`
  display: block;
  align-items: center;
  justify-content: center ;
  box-shadow: ${constants.boxShadow};
  margin-bottom: .5rem;
  padding: .5rem;
  background-color: white;
`;
export const MainFooter = styled.h1`
  display: block;
  align-items: center;
  margin: 0;
`;
export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${constants.boxShadow};
  padding: .5rem;
  background-color: white;
  min-width: auto;
`;
export const Wrapper = styled.div``;

export const FixedWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
  margin-bottom: 4rem;
`;

export const NavButton = styled.div`
  cursor: pointer;
  @media (min-width: ${mediaSizes.sm}px) {
    background-color: lightgrey;
    color: black;
    font-variant: small-caps;
    box-shadow: ${constants.boxShadow};
    
  }
`;

export const NavButtonWrapper = styled.div`
  display: box;
  margin-left: 7px;
  margin-top: 19px;
`;