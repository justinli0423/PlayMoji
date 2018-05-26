import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

import {Field} from './FieldInput'; 

export class Form extends Component {
  render() {
    return (
        <Wrapper>
            <Field placeholder='Playlist Name'></Field>
            <Field placeholder='Description (Optional)'></Field>
            <Field placeholder='Song'></Field>
            <Field placeholder='Artist'></Field>
        </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;