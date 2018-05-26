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

    axios.get('https://api.spotify.com/v1/me',{headers:{'Authorization':`Bearer ${access_token}`}}).then((data)=>{
      this.setState({'id': data.data.id, 'display': data.data.display_name});
    },(e)=>{
      console.log(e);
    })
  }

  logout(){
    this.setState({'id': undefined, 'display': undefined});
  }

  render() {
    return (
      <Container>
        <WrapperFlex>
          <Title>Spot.me</Title>
          {(!this.state.id) && <Login label = {"Sign in"}></Login>}
          <Form token={this.state.access_token} userid={this.state.id}></Form> 
        </WrapperFlex>
      {!!this.state.id && 
          <Welcome>
            <h3>{this.state.display || this.state.id}</h3>
            <logoutButton onClick={()=>this.setState({'id':''})}>Logout</logoutButton>
            <br/>
          </Welcome>
        }
      </Container>
    );
  }
}

const Title = styled.h1`
  text-align: center;
  font-size: 4em;
`;

const WrapperFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const Welcome = styled.div`
  display: block;
  position: absolute;
  padding: 0 2em;
  top: 0;
  right: 0;
  margin: 0 auto;
  font-size: 1em;
`;

const logoutButton = styled.a`
  float: right;
  font-size: 1em;
`;

const Container = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
`;

export default withCookies(App);
