import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {instanceOf} from 'prop-types';
import {withCookies,Cookies} from 'react-cookie';
import {Login} from './components/Button';
import {Form} from './components/PlaylistForm';
import {Button} from './components/Button';

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

    console.log(this);
    
  }

  logout(){
    this.setState({'id': undefined, 'display': undefined});
  }

  render() {
    return (
      <Wrapper>
        {(!this.state.id) && <Login label = {"Sign in"}></Login>}
        {!!this.state.id && 
          <Welcome>
            <h3>Welcome {this.state.display || this.state.id}</h3>
            <logoutButton onClick={()=>this.setState({'id':''})}>Logout</logoutButton>
            <br/>
          </Welcome>
        }
        <Form token={this.state.access_token}></Form> 
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
`;

const Welcome = styled.div`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 2em;
`;

const logoutButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  cursor: default !important;
  z-index: 1;
`;

export default withCookies(App);
