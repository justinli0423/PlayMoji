import React, { Component } from 'react';
import styled from 'styled-components';

import {Login} from './components/Button';
import {Form} from './components/Form';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Login label = {"Sign in"}></Login>
        <Form></Form> 
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
`;

export default App;
