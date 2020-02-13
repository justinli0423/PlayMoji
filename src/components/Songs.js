import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSongList, getNumEventsTriggered } from './../redux/selectors';
import { updateSongList } from './../redux/actions';

import AdditionalStats from './AdditionalStats';

import Colors from './data/Colors';

class Songs extends Component {
  static propTypes = {
    updateSongList: PropTypes.func.isRequired,
    songList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  updateSong(songIndex) {
    const { songList } = this.props;
    const { selected } = songList[songIndex];
    songList[songIndex].selected = !selected;
    this.props.updateSongList(songList);
  }

  renderTopResult() {
    const {
      songList,
    } = this.props;
    const topChoice = songList[0];
    return (
      <SongsContainer songList={songList}>
        <SectionLabel>
        Top Result
        </SectionLabel>
        <ContainerTopChoice
          onClick={this.updateSong.bind(this, 0)}
          selected={topChoice.selected}
        >
          <SongIconTopChoice src={topChoice.imageUrl} />
          <ContentTopChoice id={0}>
            {topChoice.name.length > 40 ? `${topChoice.name.slice(0, 40)}...` : topChoice.name}
            <Artist>
                Artist name here
            </Artist>
          </ContentTopChoice>
        </ContainerTopChoice>
      </SongsContainer>
    );
  }

  renderSideList() {
    const {
      songList,
    } = this.props;
    return (
      <OtherSongsContainer songList={songList}>
        <SectionLabel>
          Songs
        </SectionLabel>
        <Overflow>
          {
            songList.slice(1).map((song, i) => (
              <Container
                onClick={this.updateSong.bind(this, i + 1)}
                selected={song.selected}
              >
                <SongIcon src={song.imageUrl} />
                <Content id={i + 1}>
                  {song.name.length > 40 ? `${song.name.slice(0, 40)}...` : song.name}
                  <Artist>
                    Artist name here
                  </Artist>
                </Content>
              </Container>
            ))
          }
        </Overflow>
      </OtherSongsContainer>
    );
  }

  renderStats() {
    return (
      <AdditionalStats />
    );
  }

  render() {
    const { songList } = this.props;
    return (
      <MainContainer>
        { Array.isArray(songList) && songList.length > 0 && this.renderTopResult() }
        { this.renderSideList() }
        { this.renderStats() }
      </MainContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const songList = getSongList(state);
  const numEventsTriggered = getNumEventsTriggered(state);
  return {
    songList,
    numEventsTriggered,
  };
};

// SEPARATE INTO GENERIC COMPONENT
export const SelectLabel = styled.span`
  opacity: ${props => (props.isSelected ? 1 : 0.3)};
  position: absolute;
  right: 0;
  top: 50%;
  margin-right: 10px;
  color: ${props => (props.isSelected ? Colors.darkGreen : Colors.darkGrey)};
  font-size: 20px;
  transform: translateY(-50%);
  transition: all .2s linear;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  padding-left: 10px;
  font-size: 2em;
  color: ${Colors.white};
`;

export const Container = styled.div`
  position: relative;
  transition: all .3s;
  display: flex;
  flex-direction: row;
  padding: 15px;
  background-color: ${props => (props.selected ? Colors.darkGrey2 : Colors.spotifyGrey)};
  cursor: default;

  :hover {
    background-color: ${Colors.darkGrey2};
  }
`;

export const SongIcon = styled.img`
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 5px;
  border-radius: 5px;
`;

const Artist = styled.div`
  padding-top: 5px;
  font-size: 1em;
  color: ${Colors.grey};
`;

const SongsContainer = styled.div`
  display: ${props => ((Array.isArray(props.songList) && props.songList.length > 0) ? 'flex' : 'none')};
  flex-direction: column;
  margin: 15px;
  overflow-y: hidden;
  scrollbar-width: 10px;
`;

const OtherSongsContainer = SongsContainer.extend`
  width: 450px;
`;

const Overflow = styled.div`
  height: 400px;
  overflow-y: scroll;
`;

const SectionLabel = styled.div`
  margin-bottom: 10px;
  color: ${Colors.white};
  font-size: 3em;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContainerTopChoice = Container.extend`
  display: flex;
  flex-direction: column;
  width: 40em;
  margin: 0;
  border-radius: 5px;
`;

const SongIconTopChoice = SongIcon.extend`
  width: 100px;
  height: 100px;
`;

const ContentTopChoice = Content.extend`
  padding: 5px 3px;
`;

export default connect(mapStateToProps, { updateSongList, getNumEventsTriggered })(Songs);
