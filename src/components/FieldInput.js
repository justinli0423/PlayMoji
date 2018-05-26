import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Field extends Component {
  render() {
    return (
      <Input id={this.props.id} placeholder = {this.props.placeholder} type = "text" name = {this.props.name} onChange={()=>this.props.func(document.getElementById(this.props.id).value)}/>        
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