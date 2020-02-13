import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateSongList } from '../redux/actions';
import { getAccessToken, getSongList, getNumEventsTriggered } from '../redux/selectors';

import { SongIcon } from './Songs';

import Colors from './data/Colors';

class NavBar extends Component {
  handleUpdateSongs(songs = []) {
    this.props.updateSongList(songs);
  }

  filterSelectedSongs() {
    const { songList } = this.props;
    return songList.filter(song => song.selected);
  }

  removeSelectedSong(songToDeselect) {
    const { songList } = this.props;
    // change songList of objects in objects instead of array of objects (perf)
    const updatedList = songList.map((song) => {
      if (songToDeselect === song) {
        return {
          ...song,
          selected: false,
        };
      }
      return song;
    });
    return this.handleUpdateSongs(updatedList);
  }

  render() {
    return (
      <Container>
        <Header>
          SELECTED SONGS
        </Header>
        <SongsContainer>
          {
            this.filterSelectedSongs().map(song => (
              <SongWrapper onClick={() => { this.removeSelectedSong(song); }}>
                <DeleteSongIcon src={song.imageUrl} />
                <SongName>{song.name.length > 20 ? `${song.name.slice(0, 20)}...` : song.name}</SongName>
              </SongWrapper>
            ))
          }
        </SongsContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const accessToken = getAccessToken(state);
  const numEventsTriggered = getNumEventsTriggered(state);
  const songList = getSongList(state);
  return {
    accessToken,
    songList,
    numEventsTriggered,
  };
};


const Container = styled.div`
  display: inline-block;
  width: 200px;
  padding-left: 10px;
  background-color: ${Colors.black};
  font-size: 3em;
`;

const SongsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  color: ${Colors.white};
`;

const Header = styled.div`
  padding: 10px 0;
  font-size: 12px;
  text-align: left;
  color: ${Colors.white};
`;

const SongName = styled.span`
  width: 100%;
  padding: 3px;
  font-size: 10px;
`;

const SongWrapper = styled.span`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  transition: .3s all linear;
  cursor: default;

  :hover {
    background-color: ${Colors.darkGrey2};
  }
`;

const DeleteSongIcon = SongIcon.extend`
  display: inline-block;
  height: 15px;
  width: 15px;
`;

export default connect(mapStateToProps, { updateSongList })(NavBar);
