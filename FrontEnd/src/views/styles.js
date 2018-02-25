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