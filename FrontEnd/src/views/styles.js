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
  background-color: whitesmoke;
  border-radius: 5px;
  padding: 8px;
  box-shadow: ${constants.boxShadow};
`;

export const MainHeader = styled.h1`
  margin: 0;
`;
export const FootBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center ;
  box-shadow: ${constants.boxShadow};
  margin-bottom: .5rem;
  padding: .5rem;
  background-color: white;
`;
export const MainFooter = styled.h1`
  display: flex;
  align-items: center;
  margin: 0;
`;
export const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${constants.boxShadow};
  margin-bottom: .5rem;
  padding: .5rem;
  background-color: white;
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
  margin-right: 1rem;
  @media (min-width: ${mediaSizes.sm}px) {
    color: red;
  }
`;

export const NavButtonWrapper = styled.div`
  display: flex;
`;