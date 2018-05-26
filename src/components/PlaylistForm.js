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
      axios.get('https://api.spotify.com/v1/search',{
        params:{
          q:val,
          type:'track',
          limit:10
        },
        headers:{
          'Authorization':`Bearer ${this.props.token}`
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

  updateSong(val){
    console.log(this.state);
    var song_l = this.state.song_list
    song_l.push(val);
    console.log(song_l);
    this.setState({song_list:song_l});
    // this.setState({song_list:this.state.song_list.push(val)});
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
          {this.state.song_list.map((song) => {
            return <Item>{song.name}</Item>
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