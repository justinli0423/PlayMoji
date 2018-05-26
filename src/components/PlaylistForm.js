import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from './data/Colors';

import {FieldDynamic, Field} from './FieldInput';
import {Songs} from './Songs';
import {Button} from './Button';
import {Emoji} from './emoji';

const server = 'http://ec2-18-191-120-207.us-east-2.compute.amazonaws.com:8080';

export class Form extends Component {

  constructor(props){
    super(props);
    this.state = {
      song_list:[]
    };
  }

  searchSong(val){  
    if(val){
      axios.get(`${server}/tracks`,{
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

  formatListToString(){
    //Turns list into comma separated string
    var sl = this.state.song_list;
    console.log(sl);
    var ret = ['','']; //0 - trackId, 1 - artistIds
    sl.map((song)=>{
      ret[0] += `${song.trackId},`;
      ret[1] += `${song.artistId},`;
    });
    ret[0] = ret[0].slice(0,-1);
    ret[1] = ret[1].slice(0,-1);
    return ret;
  }
  createPlaylist(){
    //In progress
    let self = this;
    var song_info = self.formatListToString();
    axios.post(`${server}/playlists`,{
      
        user:self.props.userid,
        name: document.getElementById('playlist').value,
        description: document.getElementById('desc').value,
        tracks:song_info[0],
        artists:song_info[1],
        limit:50
      },
      {
        headers:{
          'Authorization':`Bearer ${self.props.token}`
      }
    }).then((result)=>{
      console.log(self);
      console.log(result);
    },(err)=>{
      console.log(self);
      console.log('error',err);
    });
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
            <Field id = 'playlist' placeholder='Playlist Name'></Field>
            <Field id = 'desc' placeholder='Description (Optional)'></Field>
            <FieldDynamic id='song-search' placeholder='Song Name' func={(val)=>{this.searchSong(val)}}></FieldDynamic>
            <Button onClick={this.createPlaylist.bind(this)}>Create Playlist</Button>
            <Emoji/>
        </WrapperRow>
        {<Songs flag_cap = {this.state.song_list.length >= 5}songsArray = {this.state.songs} callback={(val)=>{this.updateSong(val)}}/>}        
        <WrapperRow_Center>
          {this.state.song_list.map((song, i) => {
            return <Item><ButtonRemove id={i} onClick={this.removeSong.bind(this,i)}>x</ButtonRemove><span>{song.name}</span></Item>
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
  margin: 0 4em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Item = styled.span`
  margin: .5em auto;
  padding-left: 3em;
`;

const ButtonRemove = Button.extend`
  width: 1em;
  padding: 0 .2em;
  display: inline;
  margin: .5em;
  margin-top: 0;
`;

const WrapperRow_Center = WrapperRow.extend`
  float: right;
  justify-content: flex-start;
  margin: 0;
`