import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class FieldDynamic extends Component {
  render() {
    return (
      <Input id={this.props.id} placeholder = {this.props.placeholder} type = "text" name = {this.props.name} onChange={()=>this.props.func(document.getElementById(this.props.id).value)}/>        
    );
  }
};

export class Field extends Component {
  render() {
    return (
      <Input id={this.props.id} placeholder = {this.props.placeholder} type = "text" name = {this.props.name}/>        
    );
  }
};

const Input = styled.input`
    font-size: 2em;
    margin: .5em auto;
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