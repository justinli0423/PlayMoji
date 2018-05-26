import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

import {songData} from './PlaylistForm';

export class Songs extends Component {
constructor(props) {
    super(props);
    this.state = {
        'list': []
    }
}

  register(song, songId) {
    this.setState.list = this.state.list.push(song);
    // console.log(song);
  }

  render() {
      let songs = this.props.songsArray;
      console.log(this.state.list);
    return (
      <List>{songs.map((song) => {
            return <Container><Content id = {songs.indexOf(song)}>{song.name}</Content><Button  onClick = {this.register.bind(this, song)}>Add</Button></Container> 
        })}
      </List>
    );
  }
};

const List = styled.div`
    margin-top: 5em;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-shrink: 1;
    flex-wrap: 1;
`;

const Content = styled.div`
    display: inline;
    font-size: 1.2em;
    padding: 1em 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Button = styled.button`
    background: transparent;
    height: 25px;
    /* border: transparent; */
`;

const Image = styled.img`
    width: 60px;
    height: 60px;
`;