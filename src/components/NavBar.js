import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';
import Colors from './data/Colors';

const NavBar = props => (
  <Container>
    <ContentWrapper>
      <Title>playmoji</Title>
      <LogoutButton onClick={props.logout}>Logout</LogoutButton>
    </ContentWrapper>
  </Container>
);

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  top: 0%;
  left: 0%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2em;
  border-bottom: 2px solid ${Colors.darkGrey};
`;

const Title = styled.h1`
  margin-left: 1em;
  font-size: 4em;
`;

const LogoutButton = Button.extend`
  margin: 0 10px;
  border-bottom: 2px ${Colors.darkGrey};
`;

export default NavBar;
