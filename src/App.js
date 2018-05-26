import React, { Component } from 'react';
import styled from 'styled-components';
import {instanceOf} from 'prop-types';
import {withCookies,Cookies} from 'react-cookie'
import {Login} from './components/Button';
import {Form} from './components/Form';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentWillMount() {
    const { cookies } = this.props;
  
    var params = new URLSearchParams(window.location.hash.slice(1,));

    var access_token = params.get('access_token');

    if(access_token){
      cookies.set('access_token',access_token);
    }
    access_token = cookies.get('access_token');
    this.setState({'access_token':access_token});
    console.log(this);
  }
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

export default withCookies(App);
