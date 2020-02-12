/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';

import { FieldDynamic, Field } from './FieldInput';
import { Button } from './Button';
import Emoji from './emoji';
import Success from './Success';
import { getAccessToken, getUserId, getEmojis, getSongList, getNumEventsTriggered } from '../redux/selectors';
import { updateSongList } from '../redux/actions';
import Colors from './data/Colors';

import Songs, { Container as SongsContainer, SongContent, Button as RemoveButton, Content as RemoveSongContent, SelectLabel as DeleteLabel } from './Songs';

const server = 'https://spotify-playlist-generator-api.herokuapp.com';
const emojiapi = 'https://emojistoemotions.herokuapp.com/emojicollection/';

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      success: false,
    };
  }

  async getSongs() {
    try {
      const res = await this.getEmojiString();
      await this.createPlaylist(res);
    } catch {
      try {
        await this.createPlaylistBackup();
      } catch (err) {
        console.log(`Cannot create playlist: ${err}`); // replace with component
        window.location.reload();
      }
    } finally {
      this.setState({ success: true });
      setTimeout(() => { // turn off success after 3s
        this.setState({ success: false });
      }, 3000);
      this.props.updateSongList([]);
    }
  }

  getEmojiString() {
    const { emojiString } = this.props;
    return axios.get(`${emojiapi}${emojiString}`)
      .then(res => res)
      .catch((error) => {
        return error;
      });
  }

  removeSong(id) {
    const { songList } = this.props;
    songList.splice(id, 1);
    this.props.updateSongList(songList);
  }

  formatListToString() {
    // Turns list into comma separated string
    const ret = ['', '']; // 0 - trackId, 1 - artistIds
    const { songList } = this.props;
    songList.forEach((song) => {
      ret[0] += `${song.trackId},`;
      ret[1] += `${song.artistId},`;
    });
    // removing the last comma
    ret[0] = ret[0].slice(0, -1);
    ret[1] = ret[1].slice(0, -1);
    return ret;
  }

  createPlaylistBackup() {
    const {
      userId,
      accessToken,
    } = this.props;
    const songInfo = this.formatListToString();
    return axios.post(`${server}/playlists`, {
      user: userId,
      name: document.getElementById('playlist').value,
      description: document.getElementById('desc').value,
      tracks: songInfo[0],
      artists: songInfo[1],
      limit: 50,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => {
      Promise.resolve(true);
    }).catch((err) => {
      return err;
    });
  }


  createPlaylist(res) {
    const {
      userId,
      accessToken,
    } = this.props;
    const songInfo = this.formatListToString();
    // returns formatted object for spotify api
    // TO FIX ON API SIDE: EMOJIS ARE NOT PARSED CORRECTLY - SPOTIFY REJECTS BELOW SOMETIMES
    const { data } = res;
    axios.post(
      `${server}/playlists`, {
        user: userId,
        name: document.getElementById('playlist').value,
        description: document.getElementById('desc').value,
        tracks: songInfo[0],
        artists: songInfo[1],
        limit: 50,
        danceability: data.danceability,
        energy: data.energy,
        liveness: data.liveness,
        loudness: data.loudness,
        mode: data.mode,
        popularity: data.popularity,
        valence: data.valence,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then(() => {
      Promise.resolve(true);
    }).catch((error) => {
      return error;
    });
  }

  searchSong(val) {
    if (val) {
      this.setState({
        searchString: val,
      });
      axios.get(`${server}/tracks`, {
        params: {
          q: val,
          type: 'track',
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${this.props.accessToken}`,
        },
      }).then((result) => {
        const songs = result.data.tracks || [];
        const selectSongList = [];
        songs.forEach(() => {
          selectSongList.push(false);
        });
        this.setState({
          songs,
        });
      }, (e) => {
        console.log('error', e);
        if (e.response.status === 401) {
          // refresh page to auto log out
          window.location.reload();
        }
      });
    } else {
      // set the return query to empty array (errors in function due to array undefined)
      this.setState({
        songs: [],
      });
    }
  }

  render() {
    const {
      searchString,
      songs,
      success,
    } = this.state;
    const { songList } = this.props;
    return (
      <Wrapper>
        <WrapperRow>
          {success && <Success />}
          <Field id="playlist" required placeholder="Playlist Name" />
          <WhiteSpace>&nbsp;</WhiteSpace>
          <Field id="desc" required placeholder="Description" />
          <WhiteSpace>&nbsp;</WhiteSpace>
          <FieldDynamic id="song-search" required placeholder="Search a song!" searchSong={(val) => { this.searchSong(val); }} />
          <WhiteSpace>&nbsp;</WhiteSpace>
          <ButtonCreate onClick={this.getSongs.bind(this)}>Create Playlist</ButtonCreate>
        </WrapperRow>
        <SelectableContainer>
          <SelectableSections>
            <SectionLabel>
              Select Up To Five Songs
            </SectionLabel>
            {/* For search results */}
            <Songs
              searchString={searchString}
              flag_cap={songList.length >= 5}
              searchResults={songs}
            />
          </SelectableSections>
          <SelectableSections>
            <SectionLabel>
              Selected Songs
            </SectionLabel>
            {/* For the spotify request results */}
            <SongContent>
              {songList.map((song, i) => (
                <SelectableContainer draggable>
                  <SelectedSongsContainer
                    onClick={this.removeSong.bind(this, song)}
                  >
                    <RemoveButton src={song.imageUrl} />
                    <RemoveSongContent id={i}>
                      {song.name.length > 40 ? `${song.name.substring(0, 40)}...` : song.name}
                    </RemoveSongContent>
                    <DeleteLabel>&times;</DeleteLabel>
                  </SelectedSongsContainer>
                </SelectableContainer>
              ))
              }
            </SongContent>
          </SelectableSections>
        </SelectableContainer>
        <WrapperColumn>
          <Emoji />
        </WrapperColumn>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const accessToken = getAccessToken(state);
  const userId = getUserId(state);
  const emojiString = getEmojis(state);
  const songList = getSongList(state);
  const numEventsTriggered = getNumEventsTriggered(state);
  return {
    accessToken, userId, emojiString, songList, numEventsTriggered,
  };
};

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: .5em;
`;

const WrapperColumn = WrapperRow.extend`
  flex-direction: column;
  margin: 0;
`;

const SelectableContainer = WrapperRow.extend`
  margin: 0 3em 5em;
  height: calc(1.5rem * 27.7);
`;

const SelectedSongsContainer = SongsContainer.extend`
  &:hover {
    border-top: 2px solid ${Colors.red};
    border-bottom: 2px solid ${Colors.red};
    z-index: 100;
  }
  &:hover ${DeleteLabel} {
    opacity: 1;
    color: ${Colors.red};
  }
`;

const SectionLabel = styled.div`
  font-size: 2em;
  opacity: .7;
  margin-top: -1.5em;
`;

const SelectableSections = styled.div`
  margin: 3em;
  width: 60em;
  height: calc(1.5rem * 27.7);
  border: 3px solid ${Colors.grey};
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const WhiteSpace = styled.span`
  width: 2em;
`;

const ButtonCreate = Button.extend`
  margin: 10px 3px;
`;

export default connect(mapStateToProps, { updateSongList })(PlaylistForm);
