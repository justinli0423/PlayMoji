/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';

import { FieldDynamic, Field } from './FieldInput';
import { Button } from './Button';
import Songs from './Songs';
import Emoji from './emoji';
import Success from './Success';

const server = 'https://spotify-playlist-generator-api.herokuapp.com';
const emojiapi = 'https://emojistoemotions.herokuapp.com/emojicollection/';

export default class Form extends Component {
  static propTypes = {
    token: PropTypes.string,
  }

  static defaultProps = {
    token: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      song_list: [],
      emoji_string: '',
      searchString: '',
      success: false,
    };
  }

  componentWillMount() {
    this.setState({
      song_list: [],
      songs: [],
    });
  }

  getEmojiString(val) {
    this.setState({ emoji_string: val });
  }

  removeSong(id) {
    const songList = this.state.song_list;
    songList.splice(id, 1);
    this.setState({ song_list: songList });
  }

  formatListToString() {
    // Turns list into comma separated string
    const ret = ['', '']; // 0 - trackId, 1 - artistIds
    const { song_list } = this.state;
    song_list.forEach((song) => {
      ret[0] += `${song.trackId},`;
      ret[1] += `${song.artistId},`;
    });
    // removing the last comma
    ret[0] = ret[0].slice(0, -1);
    ret[1] = ret[1].slice(0, -1);
    return ret;
  }

  createPlaylist() {
    const {
      userid,
      token,
    } = this.props;
    const songInfo = this.formatListToString();
    axios.get(`${emojiapi}${this.state.emoji_string}`).then((res) => {
      // returns formatted object for spotify api
      const { data } = res;
      axios.post(
        `${server}/playlists`, {
          user: userid,
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
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(() => {
        this.setState({ success: true });
        this.setState({
          song_list: [],
        });
      }, (err) => {
        console.log('error', err);
      });
    }, () => {
      // seperate API call if emojis were not picked - in error callback
      axios.post(`${server}/playlists`, {
        user: userid,
        name: document.getElementById('playlist').value,
        description: document.getElementById('desc').value,
        tracks: songInfo[0],
        artists: songInfo[1],
        limit: 50,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        this.setState({ success: true });
      }, (err) => {
        if (err.response.status === 401) {
          window.location.reload();
        }
      });
    });
  }

  updateSong(val) {
    const { song_list } = this.state;
    song_list.push(val);
    this.setState({ song_list });
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
          Authorization: `Bearer ${this.props.token}`,
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
    return (
      <Wrapper>
        <WrapperRow>
          {this.state.success && <Success />}
          <Field id="playlist" required placeholder="Playlist Name" />
          <Field id="desc" required placeholder="Description" />
          <FieldDynamic id="song-search" required placeholder="Search a song!" searchSong={(val) => { this.searchSong(val); }} />
          {
            <Songs
              searchString={this.state.searchString}
              flag_cap={this.state.song_list.length >= 5}
              songsArray={this.state.songs}
              selectSong={(val) => { this.updateSong(val); }}
            />
          }
          <RemoveSongWrapper>
            {this.state.song_list.map((song, i) => <Item><ButtonRemove id={i} onClick={this.removeSong.bind(this, i)}>x</ButtonRemove><span>{song.name}</span></Item>)}
          </RemoveSongWrapper>
          <Emoji getEmojiString={(val) => { this.getEmojiString(val); }} />
          <ButtonCreate onClick={this.createPlaylist.bind(this)}>Create Playlist</ButtonCreate>
        </WrapperRow>
      </Wrapper>
    );
  }
}

const WrapperRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RemoveSongWrapper = Wrapper.extend`
  margin-top: 2em;
`;

const Item = styled.span`
  margin: .5em auto;
  padding-left: 3em;
`;

const ButtonCreate = Button.extend`
  margin-top: 0;
  margin-bottom: 0;
`;

const ButtonRemove = Button.extend`
  padding: 0 .2em;
  display: inline;
  margin: .5em;
`;
