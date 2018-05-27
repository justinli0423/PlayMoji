import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  register(song, songId) {
    this.props.callback(song);
  }

  render() {
    const songs = this.props.songsArray || [];

    return (
      !this.props.flag_cap && <Wrapper>
        <List>{songs.length != 0 && <Title>Make your Selections!</Title>}{songs.slice(0, songs.length / 2).map((song, i) => <Container><Content id={i}>{song.name.length > 20 ? `${song.name.substring(0, 20)}...` : song.name}</Content><Button onClick={this.register.bind(this, song)} src={song.imageUrl} /></Container>)}
        </List><List>
          {songs.slice(songs.length / 2, songs.length).map((song, i) => <Container><Content id={i}>{song.name.length > 20 ? `${song.name.substring(0, 20) }...` : song.name}</Content><Button onClick={this.register.bind(this, song)} src={song.imageUrl} /></Container>)}
               </List>
        </Wrapper>
    );
  }
}

const Title = styled.h1`
  text-align: center;
  width: 100%;
  margin-bottom: 3em;
`;

const Wrapper = styled.div`
  margin-top: -3em;
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
    width: 15em;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;
