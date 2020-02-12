import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Login } from './Button';

const LoginPage = () => (
  <Container>
    <ContentWrapper>
      <Title>playmoji</Title>
      <Caption>New way to find music</Caption>
      <Login label="Sign in" />
    </ContentWrapper>
  </Container>
);

const gradient = keyframes`
    0 {
      background-position:0% 50%
    }
    50% {
      background-position:100% 50%
    }
    100%{
      background-position:0% 50%
    }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, #ffffff, #00dca9, #00dcc6, #ff5942);
  background-size: 800% 800%;
  animation: ${gradient} 30s infinite;
`;

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50%;
  border-radius: 50%;
`;

const Caption = styled.div`
  margin: 0;
  font-size: 2em;
  text-align: center;
`;

const Title = styled.h1`
  margin: 10px;
  font-size: 8em;
  text-align: center;
`;

export default LoginPage;
