import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from './data/Colors';

import {Field} from './FieldInput';
import {Songs} from './Songs';

export class Form extends Component {

  searchSong(val){
    if(val){
      axios.post('http://ec2-18-191-120-207.us-east-2.compute.amazonaws.com:8080/tracks',{
        params:{
          q:val,
          type:'track',
          limit:10
        },
        data:{
          'token':`${this.props.token}`
        }
      }).then((result)=>{
        let songs = result.data.tracks.items;
        this.setState({
          'songs': songs,
          'search': val.length
        });
      },(e)=>{
        console.log('error',e);
      });
    }
  }

componentWillMount(){
  this.setState({
    'songs': [],
    'search': ''
  })
}

  render() {
    return (
        <Wrapper>
            <Field placeholder='Playlist Name'></Field>
            <Field placeholder='Description (Optional)'></Field>
            <Field id='song-search' placeholder='Song Name' func={(val)=>{this.searchSong(val)}}></Field>
            {this.state.search.length != 0 && <Songs songsArray = {this.state.songs} searchQuery = {this.state.search}></Songs>}
        </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
