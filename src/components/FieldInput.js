import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from './data/Colors';

const SongSearch = ({ id, placeholder, searchSong }) => (
  <SearchInput id={id} placeholder={placeholder} type="text" autoComplete="off" onChange={() => searchSong(document.querySelector(`#${id}`).value)} />
);

const Field = ({ id, placeholder }) => (
  <Input id={id} placeholder={placeholder} autoComplete="off" />
);

SongSearch.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchSong: PropTypes.func.isRequired,
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const Input = styled.input`
  margin: 10px 3px;
  padding: 0.6em;
  border: none;
  border-radius: 500px;
  color: ${Colors.black};
  font-size: 2em;
  background-color: ${Colors.white};
  transition: .5s all;

  &:focus,
  &:hover,
  &:active {
    outline: none;
  }
`;

const SearchInput = styled.input`
  margin: 10px 5px;
  padding: 0.6em;
  border: none;
  border-radius: 500px;
  transition: .5s all;

  &:focus,
  &:hover,
  &:active {
    outline: none;
    transform: scale(1.2);
  }
`;

export { SongSearch, Field };
