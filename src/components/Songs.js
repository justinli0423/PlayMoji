import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from './data/Colors';

class Songs extends Component {
  static propTypes = {
    selectSong: PropTypes.func.isRequired,
    songsArray: PropTypes.arrayOf(PropTypes.object),
    flag_cap: PropTypes.bool.isRequired,
    searchString: PropTypes.string,
  };

  static defaultProps = {
    songsArray: [],
    searchString: '',
  };

  register(song) {
    this.props.selectSong(song);
  }

  render() {
    const songs = this.props.songsArray || [];

    return (
      !this.props.flag_cap &&
      <Wrapper searchString={this.props.searchString}>
        <SongContent>{songs.length !== 0 && songs.map((song, i) =>
          (
            <Container>
              <Button onClick={this.register.bind(this, song)} src={song.imageUrl} />
              <Content id={i}>{song.name.length > 40 ? `${song.name.substring(0, 40)}...` : song.name}</Content>
            </Container>
          ))}
        </SongContent>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: ${props => (props.searchString.length < 1 ? 'none' : 'relative')};
`;

const List = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex-shrink: 1;
`;

const SongContent = List.extend`
  // flex-direction: row;
`;

const Content = styled.div`
  display: block;
  font-size: 1.4em;
  text-align: center;
  margin-top: 4px;
`;

const Container = styled.div`
  /* TODO: FIX HOVER EFFECT BORDERS */
  width: 100%;
  height: 1.5rem;
  transition: all .3s;
  display: flex;
  flex-direction: row;
  padding: 15px 0;
  margin-top: -2px;
  border-top: 2px solid ${Colors.grey};
  border-bottom: 2px solid ${Colors.grey};
  &:hover {
    border-top: 2px solid ${Colors.darkGrey};
    border-bottom: 2px solid ${Colors.darkGrey};
    z-index: 100;
  }
  &:not(:first-child) {
    border-radius: 0;
  }
`;

const Button = styled.img`
  width: 25px;
  display: block;
  margin: 0 5px;
  border-radius: 5px;
`;

export default Songs;
