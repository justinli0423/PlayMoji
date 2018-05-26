import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Login extends Component {
  render() {
    const spotifyLink = 'https://accounts.spotify.com/authorize?client_id=c9560e7e9d404ceba59a76165a446b1a&redirect_uri=http://localhost:3000&scope=playlist-modify-public&response_type=token';
    return (
      <Button href={spotifyLink}>{this.props.label}</Button>
    );
  }
};

const Button = styled.a`
    padding: .5em 2em;
    font-size: 2em;
    margin: 0 auto;
    margin-top: 2em;
    text-align: center;
    color: ${Colors.black};
    border-radius: 5px;
    transition: all .5s;
    text-decoration: none;
    display: block;

    &:hover, &:active {
      background-color: ${Colors.green};
      cursor: default;
      color: white;
    }
`;

export {Button};