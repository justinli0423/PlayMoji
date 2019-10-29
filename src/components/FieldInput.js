import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Colors from './data/Colors';

const FieldDynamic = ({ id, placeholder, searchSong }) => (
  <Input id={id} placeholder={placeholder} type="text" onChange={() => searchSong(document.getElementById(id).value)} />
);

const Field = ({ id, placeholder }) => (
  <Input id={id} placeholder={placeholder} />
);

FieldDynamic.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchSong: PropTypes.func.isRequired,
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

const Input = styled.input`
  font-size: 2em;
  margin: 10px 3px;
  color: ${Colors.black};
  background-color: ${Colors.white};
  transition: all .5s;
  padding: 0.5em;
  border: none;
  border-bottom: 2px solid ${Colors.grey};
  transition: all .3s;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${Colors.black};
  }
`;

export { FieldDynamic, Field };
