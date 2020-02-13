import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Colors from './data/Colors';

const spotifyLink = `https://accounts.spotify.com/authorize?show_dialog=true&client_id=c9560e7e9d404ceba59a76165a446b1a&redirect_uri=${window.location.origin}&scope=playlist-modify-public&response_type=token`;

const Login = ({ label }) => (
  <Button href={spotifyLink}>{label}</Button>
);

Login.propTypes = {
  label: PropTypes.string.isRequired,
};

const Button = styled.a`
    padding: .5em 2em;
    font-size: 2em;
    margin: 0 auto;
    margin-top: 2em;
    text-align: center;
    color: ${Colors.white};
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

export { Button, Login };
