import React from 'react';
import styled, { keyframes } from 'styled-components';

import Colors from './data/Colors';

const Success = () => (
  <Wrapper>
    Playlist Successfully Created!
  </Wrapper>
);

const flyDown = keyframes`
  0% {
    top: -10em;
  }

  25% {
    top: -7px;
  }

  75% {
    top: -7px;
  }

  100% {
    top: -10em;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  padding: 2em 3em;
  font-size: 2em;
  color: ${Colors.white};
  border-radius: 10px;
  border: 2px solid ${Colors.green};
  background-color: ${Colors.green};
  left: 50%;
  top: -10em;
  transform: translateX(-50%);
  animation-fill-mode: forwards;
  animation: ${flyDown} 3s linear;
`;


export default Success;
