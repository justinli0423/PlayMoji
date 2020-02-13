/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { connect } from 'react-redux';

import { Field } from './FieldInput';
import { Button } from './Button';
import Emoji from './emoji';
import Success from './Success';
import { updateSongList, updateEmojiList } from '../redux/actions';
import { getAccessToken,
  getUserId,
  getEmojis,
  getSongList,
  getAdditionalProps,
  getNumEventsTriggered } from '../redux/selectors';

import Songs from './Songs';

const server = 'https://spotify-playlist-generator-api.herokuapp.com';

class PlaylistForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  async getSongs() {
    // fix the error handling
    try {
      const { additionalProps } = this.props;
      await this.createPlaylist(additionalProps);
      this.playlistCreationCB();
    } catch {
      try {
        await this.createPlaylistBackup();
        this.playlistCreationCB();
      } catch (err) {
        console.log(`Cannot create playlist: ${err}`); // replace with component
        window.location.reload();
      }
    }
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
    for (let i = 0; i < 5 && i < songList.length; i++) {
      const song = songList[i];
      if (song.selected) {
        ret[0] += `${song.trackId},`;
        ret[1] += `${song.artistId},`;
      }
    }
    // remove last comma
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
    }).catch(err => err);
  }

  createPlaylist(additionalProps) {
    const {
      userId,
      accessToken,
    } = this.props;
    const songInfo = this.formatListToString();
    // returns formatted object for spotify api
    // TO FIX ON API SIDE: EMOJIS ARE NOT PARSED CORRECTLY - SPOTIFY REJECTS BELOW SOMETIMES
    axios.post(`${server}/playlists`, {
      ...additionalProps,
      user: userId,
      name: document.querySelector('#playlist').value,
      description: document.querySelector('#desc').value,
      tracks: songInfo[0],
      artists: songInfo[1],
      limit: 50,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then(() => {
      Promise.resolve(true);
    }).catch(error => error);
  }

  playlistCreationCB() {
    const { songList } = this.props;
    this.setState({ success: true });
    setTimeout(() => { // turn off success after 3s
      this.setState({ success: false });
    }, 3000);
    this.props.updateSongList(songList.map(song => ({
      ...song,
      selected: false,
    })));
  }

  renderPlaylistInputs() {
    const { success } = this.state;
    return (
      <WrapperRow>
        {success && <Success />}
        <Field id="playlist" required placeholder="Playlist Name" />
        <WhiteSpace>&nbsp;</WhiteSpace>
        <Field id="desc" required placeholder="Description" />
        <WhiteSpace>&nbsp;</WhiteSpace>
        <ButtonCreate onClick={this.getSongs.bind(this)}>Create Playlist</ButtonCreate>
      </WrapperRow>
    );
  }

  renderSongs() {
    return (
      <SelectableContainer>
        <Songs capacity={5} />
      </SelectableContainer>
    );
  }

  render() {
    return (
      <Wrapper>
        { this.renderPlaylistInputs() }
        { this.renderSongs() }
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
  const additionalProps = getAdditionalProps(state);
  const numEventsTriggered = getNumEventsTriggered(state);
  return {
    accessToken,
    userId,
    emojiString,
    songList,
    additionalProps,
    numEventsTriggered,
  };
};

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin: .5em 4em;
`;

const WrapperColumn = WrapperRow.extend`
  flex-direction: column;
  justify-content: center;
  margin: 0;
`;

const SelectableContainer = WrapperRow.extend`
  flex-direction: column;
  justify-content: center;
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

export default connect(mapStateToProps, { updateSongList, updateEmojiList })(PlaylistForm);
