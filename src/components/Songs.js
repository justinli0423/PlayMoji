import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

var exportList;

export class Songs extends Component {
constructor(props) {
    super(props);
    this.state = {
        'list': []
    }
}

  register(song, songId) {
      this.props.callback(song);
  }

  render() {
      let songs = this.props.songsArray || [];

    return (
      !this.props.flag_cap && <Wrapper>
          <List>{songs.slice(0, songs.length/2).map((song, i) => {
            return<Container><Content id = {i}>{song.name.length > 20 ? song.name.substring(0, 20) + '...': song.name}</Content><Button onClick = {this.register.bind(this, song)} src = {song.imageUrl}></Button></Container> 
        })}</List><List>
        {songs.slice(songs.length/2, songs.length).map((song, i) => {
            return<Container><Content id = {i}>{song.name.length > 20 ? song.name.substring(0, 20) + '...': song.name}</Content><Button onClick = {this.register.bind(this, song)} src = {song.imageUrl}></Button></Container> 
        })}
      </List>
      </Wrapper>
    );
  }
};

export{exportList};

const Wrapper = styled.div`
`;

const List = styled.div`
    margin-top: 5em;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const Content = styled.div`
    display: inline;
    font-size: 1.2em;
    padding: 1em;
    text-align: center;
`;

const Container = styled.div`
    padding: .5em;
`;

const Button = styled.img`
    width: 200px;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;
