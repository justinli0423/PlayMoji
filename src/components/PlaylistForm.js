import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from './data/Colors';

import {Field} from './FieldInput'; 

export class Form extends Component {

  searchSong(val){
    console.log(this.props.token);
    if(val){
      axios.get('https://api.spotify.com/v1/search',{
        params:{
          q:val,
          type:'track',
          limit:10
        },
        headers:{
          'Authorization':`Bearer ${this.props.token}`
        }
      }).then((data)=>{
        console.log(data);
      },(e)=>{
        console.log('error',e);
      });
    }
  }

  render() {

    return (
        <Wrapper>
            <Field placeholder='Playlist Name'></Field>
            <Field placeholder='Description (Optional)'></Field>
            <Field id='song-search' placeholder='Song Name' func={(val)=>{this.searchSong(val)}}></Field>
        </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;