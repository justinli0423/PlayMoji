import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Field extends Component {
  render() {
    return (
      <Input placeholder = {this.props.placeholder} type = "text" name = {this.props.name}/>        
    );
  }
};


const Input = styled.input`
    font-size: 2em;
    margin: .5em auto;
    width: 20em;
    color: ${Colors.black};
    background-color: ${Colors.white};
    border-radius: 5px;
    transition: all .5s;
    padding: 0.5em;
    border: 2px solid ${Colors.green};


    &:focus {
      outline: none;
    }
`;