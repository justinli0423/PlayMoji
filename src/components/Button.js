import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Login extends Component {
  render() {
    return (
      <Button>Sign in</Button>
    );
  }
};

const Button = styled.a`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${Colors.green};
    padding: 1em 2em;
    font-size: 2.5em;
    color: ${Colors.white};
    border-radius: 35px;
    transition: all .5s;

    &:hover {
      background-color: ${Colors.darkGreen};
      color: white;
    }
`;