import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from './data/Colors';

import {Field} from './FieldInput';
import {Songs} from './Songs';

export class Form extends Component {

  constructor(props){
    super(props);
    this.state = {
      song_list:[]
    };
  }

  searchSong(val){  
    if(val){
      axios.get('http://ec2-18-191-120-207.us-east-2.compute.amazonaws.com:8080/tracks',{
        params:{
          q:val,
          type:'track',
          limit:10
        },
        headers:{
          'Authorization':`Bearer ${this.props.token}`
        }
      }).then((result)=>{
        let songs = result.data.tracks;
        this.setState({
          'songs': songs,
          'search': val.length
        });
      },(e)=>{
        console.log('error',e);
      });
    }
  }

  updateSong(val){
    var song_l = this.state.song_list
    song_l.push(val);
    this.setState({song_list:song_l});
  }

  removeSong(id){
    var song_l = this.state.song_list;
    song_l.splice(id,1);
    this.setState({song_list:song_l});
  }
componentWillMount(){
  this.setState({
    'song_list': [],
    'songs': [],
    'search': ''
  })
}

  render() {
    return (
      <Wrapper>
        <WrapperRow>
            <Field placeholder='Playlist Name'></Field>
            <Field placeholder='Description (Optional)'></Field>
            <Field id='song-search' placeholder='Song Name' func={(val)=>{this.searchSong(val)}}></Field>
            {this.state.search.length != 0 && <Songs flag_cap = {this.state.song_list.length >= 5}songsArray = {this.state.songs} callback={(val)=>{this.updateSong(val)}}/>}
        </WrapperRow>
        <WrapperRow_Center>
          {this.state.song_list.map((song, i) => {
            return <Item><button id={i} onClick={this.removeSong.bind(this,i)}>x</button>{song.name}</Item>
          })}
        </WrapperRow_Center>
      </Wrapper>
    );
  }
};

const WrapperRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.span`
  font-size: 2em;
  margin: .5em auto;
  padding-left: 3em;
`;

const WrapperRow_Center = WrapperRow.extend`
  justify-content: flex-start;
`