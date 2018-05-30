import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {instanceOf} from 'prop-types';
import {withCookies,Cookies} from 'react-cookie';
import {Login} from './components/Button';
import {Form} from './components/PlaylistForm';
import {Button} from './components/Button';

import Colors from './components/data/Colors';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props){
    super(props);

    const {cookies} = this.props;
    this.setState({
      access_token:cookies.get('access_token') || null
    })
  }

  componentWillMount(){
    const { cookies } = this.props;

    var params = new URLSearchParams(window.location.hash.slice(1,));

    var access_token = params.get('access_token');

    if(access_token){
      cookies.set('access_token',access_token);
      window.location = window.location.pathname;
    }
    access_token = cookies.get('access_token');
    this.setState({'access_token':access_token});

    axios.get('https://api.spotify.com/v1/me',{headers:{'Authorization':`Bearer ${access_token}`}}).then((data)=>{
      this.setState({'id': data.data.id, 'display': data.data.display_name});
    },(e)=>{
      console.log(e);
      if(e.response.status == 401 && access_token != null){
        console.log('Token has expired, logging out')
        cookies.remove('access_token')
        window.location = window.location.pathname;
      }
    })
  }

  logout(){
    const {cookies} = this.props
    console.log('Logging out');
    this.setState({'id': undefined, 'display': undefined});
    cookies.remove('access_token');
    window.location = window.location.pathname;
  }

  render() {
    return (
      <Container>
        <WrapperFlex>
          <Title>playmoji</Title>
          {(!this.state.access_token) && <Login label = {"Sign in"}></Login>}
          {!!this.state.access_token && <Form token={this.state.access_token} userid={this.state.id}></Form>}
        </WrapperFlex>
      {!!this.state.access_token &&
          <Welcome>
            <h3>{this.state.display || this.state.id}</h3>
            <logoutButton style={buttonStyles} onClick={this.logout.bind(this)}>Logout</logoutButton>
            <br/>
          </Welcome>
        }
      </Container>
    );
  }
}

const Title = styled.h1`
  text-align: center;
  font-size: 6em;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WrapperFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  margin-top: 10em;
`;

const Welcome = styled.div`
  display: block;
  position: absolute;
  cursor: default;
  padding: 0 2em;
  top: 0;
  right: 0;
  margin: 0;
  font-size: 1em;
`;

const logoutButton = Button.extend`
  float: right;
  font-size: 1em;
  padding: 0;
  text-align: right;
  border-radius: 0;
  display: block;
  text-decoration: none;
  &:hover, &:active {
      cursor: default;
    }
`;

var buttonStyles = {
    float: "right"
};

const Container = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
`;

export default withCookies(App);
