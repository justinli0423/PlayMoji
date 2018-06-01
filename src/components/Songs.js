import React, { Component } from 'react';
import styled from 'styled-components';

import Colors from './data/Colors';

export class Songs extends Component {
  register(song) {
    this.props.callback(song);
  }

  render() {
    const songs = this.props.songsArray || [];
    console.log(this.props.searchString)

    return (
      !this.props.flag_cap && <Wrapper searchString={this.props.searchString}>
        <List_top>{songs.length != 0 && songs.slice(0, songs.length / 2).map((song, i) => <Container><Button onClick={this.register.bind(this, song)} src={song.imageUrl} /><Content id={i}>{song.name.length > 10 ? `${song.name.substring(0, 10)}...` : song.name}</Content></Container>)}
        </List_top>
        <List>
          {songs.slice(songs.length / 2, songs.length).map((song, i) => <Container><Button onClick={this.register.bind(this, song, i)} src={song.imageUrl} /><Content id={i}>{song.name.length > 10 ? `${song.name.substring(0, 10)}...` : song.name}</Content></Container>)}
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
  display: ${props => props.searchString.length < 1 ? 'none' : 'default'};
`;

const List = styled.div`
    margin-top: 5em;
    display: flex;
    justify-content: space-evenly;
    flex-shrink: 1;
`;

const List_top = List.extend`
  margin-top: 2em;
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
