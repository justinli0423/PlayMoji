import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Colors from './data/Colors';
import { getSongList, getNumEventsTriggered } from './../redux/selectors';
import { updateSongList } from './../redux/actions';

class Songs extends Component {
  static propTypes = {
    updateSongList: PropTypes.func.isRequired,
    songList: PropTypes.arrayOf(PropTypes.object).isRequired,
    searchResults: PropTypes.arrayOf(PropTypes.object),
    flag_cap: PropTypes.bool.isRequired,
    searchString: PropTypes.string,
  };

  static defaultProps = {
    searchResults: [],
    searchString: '',
  };

  updateSong(val) {
    const { songList } = this.props;
    songList.push(val);
    this.props.updateSongList(songList);
    this.forceUpdate();
  }

  render() {
    const songs = this.props.searchResults || [];
    const { songList } = this.props;
    return (
      !this.props.flag_cap &&
      <Wrapper searchString={this.props.searchString}>
        <SongContent>
          {
            songs.length !== 0 && songs.map((song, i) => (
              songList.indexOf(song) === -1 &&
                <Container onClick={this.updateSong.bind(this, song)}>
                  <Button src={song.imageUrl} />
                  <Content id={i}>
                    {song.name.length > 40 ? `${song.name.substring(0, 40)}...` : song.name}
                  </Content>
                  <SelectLabel>&#10004;</SelectLabel>
                </Container>
            ))
          }
        </SongContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const songList = getSongList(state);
  const numEventsTriggered = getNumEventsTriggered(state);
  return { songList, numEventsTriggered };
};

const Wrapper = styled.div`
  display: ${props => (props.searchString.length < 1 ? 'none' : 'relative')};
`;

const List = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  flex-shrink: 1;
`;

export const SelectLabel = styled.span`
  opacity: 0.3;
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 10px;
  color: ${Colors.darkGrey};
  font-size: 20px;
  transform: translateY(-50%);
  transition: all .2s linear;
`;

export const SongContent = List.extend`
`;

export const Content = styled.div`
  display: block;
  font-size: 1.4em;
  text-align: center;
  margin-top: 4px;
`;

export const Container = styled.div`
  /* TODO: FIX HOVER EFFECT BORDERS */
  position: relative;
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
    border-top: 2px solid ${Colors.darkGreen};
    border-bottom: 2px solid ${Colors.darkGreen};
    z-index: 100;
  }
  &:hover ${SelectLabel} {
    opacity: 1;
    color: ${Colors.darkGreen};
  }
  &:not(:first-child) {
    border-radius: 0;
  }
`;

export const Button = styled.img`
  width: 25px;
  display: block;
  margin: 0 5px;
  border-radius: 5px;
`;

export default connect(mapStateToProps, { updateSongList, getNumEventsTriggered })(Songs);
