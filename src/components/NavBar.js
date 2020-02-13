import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateSongList } from '../redux/actions';
import { getAccessToken, getNumEventsTriggered, getSongList } from '../redux/selectors';

import { Button } from './Button';
import { SongSearch } from './FieldInput';

import Colors from './data/Colors';

const server = 'https://spotify-playlist-generator-api.herokuapp.com';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDebounceHandle: null,
    };
  }

  handleUpdateSongs(songs = []) {
    this.props.updateSongList(songs);
  }

  searchSong(val) {
    const { searchDebounceHandle } = this.state;
    const {
      accessToken,
      songList,
    } = this.props;

    function getSongs() {
      axios.get(`${server}/tracks`, {
        params: {
          q: val,
          type: 'track',
          limit: 30,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((result) => {
        let songs = result.data.tracks || [];
        songs = songs.map(song => ({
          ...song,
          selected: false,
        }));
        const selectedSongs = songList.filter(song => song.selected);
        this.handleUpdateSongs(songs.concat(selectedSongs));
      }).catch((e) => {
        console.log('error', e);
        if (e.response.status === 401) {
          // refresh page to auto log out
          window.location.reload();
        }
      });
    }

    // debouncer for optimization
    clearTimeout(searchDebounceHandle);
    this.setState({ searchDebounceHandle: setTimeout(val && getSongs.bind(this), 300) });
    return null;
  }

  render() {
    return (
      <Container>
        <ContentWrapper>
          <Title>playmoji</Title>
          <FloatRightWrapper>
            <SongSearch
              id="song-search"
              required
              placeholder="Search a song!"
              searchSong={(val) => { this.searchSong(val); }}
            />
            <LogoutButton onClick={this.props.logout}>Logout</LogoutButton>
          </FloatRightWrapper>
        </ContentWrapper>
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
  width: 100%;
  background-color: ${Colors.black};
`;

const FloatRightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h1`
  margin-left: 1em;
  font-size: 4em;
  color: ${Colors.white};
`;

const LogoutButton = Button.extend`
  margin: 0 10px;
`;

export default connect(mapStateToProps, { updateSongList })(NavBar);
