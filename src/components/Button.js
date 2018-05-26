import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Login extends Component {
  render() {
    const spotifyLink = 'https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123';
    return (
      <Button href={spotifyLink}>{this.props.label}</Button>
    );
  }
};

const Button = styled.a`
    background-color: ${Colors.darkGreen};
    padding: 1em 2em;
    font-size: 2.5em;
    margin: 0 auto;
    margin-bottom: 2em;
    width: 4em;
    text-align: center;
    color: ${Colors.white};
    border-radius: 5px;
    transition: all .5s;
    text-decoration: none;
    display: block;

    &:hover, &:active {
      background-color: ${Colors.green};
      color: white;
    }
`;