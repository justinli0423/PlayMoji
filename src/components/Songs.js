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
        <List>{songs.length != 0 && songs.slice(0, songs.length / 2).map((song, i) => <Container><Button onClick={this.register.bind(this, song)} src={song.imageUrl} /><Content id={i}>{song.name.length > 10 ? `${song.name.substring(0, 10)}...` : song.name}</Content></Container>)}
        </List>
        <List>
          {songs.slice(songs.length / 2, songs.length).map((song, i) => <Container><Button onClick={this.register.bind(this, song)} src={song.imageUrl} /><Content id={i}>{song.name.length > 10 ? `${song.name.substring(0, 10)}...` : song.name}</Content></Container>)}
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
`;

const List = styled.div`
    margin-top: 5em;
    display: flex;
    justify-content: space-evenly;
    flex-shrink: 1;
`;

const Content = styled.div`
    display: block;
    font-size: 1.4em;
    text-align: center;
    margin-top: 4px;
`;

const Container = styled.div`
    padding: .5em;
    transition: all .3s;
    margin-right: 2rem;
    box-shadow: 2px 2px 5px ${Colors.grey};
    &:hover {
      transform: scale(1.2);
      box-shadow: 7px 7px 5px ${Colors.grey};
    }
`;

const Button = styled.img`
    width: 10em;
    display: block;
    margin-left: auto;
    margin-right: auto;
`;
