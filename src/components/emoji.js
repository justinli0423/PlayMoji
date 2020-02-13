import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { updateEmojiList, updateAdditionalProps } from '../redux/actions';

const server = 'https://emojistoemotions.herokuapp.com/emojicollection';
const emojiapi = 'https://emojistoemotions.herokuapp.com/emojicollection/';

class Emoji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojiList: [],
      emojiString: [],
      emojiSelect: [],
    };
    this.emojiGet();
  }

  getAdditionalProps() {
    const { emojiString } = this.state;
    return axios.get(`${emojiapi}${this.formatEmojiString(emojiString)}`)
      .then(res => res)
      .catch(error => error);
  }

  async handleEmojiList() {
    const { emojiString } = this.state;
    const defaultProps = {
      danceability: 0,
      energy: 0,
      liveness: 0,
      loudness: 0,
      mode: 0,
      popularity: 0,
      valence: 0,
    };
    this.props.updateEmojiList(this.formatEmojiString(emojiString));
    try {
      const props = await this.getAdditionalProps();
      this.props.updateAdditionalProps(props.data || defaultProps);
    } catch (e) {
      console.log(`error: ${e}`);
    }
  }

  emojiGet() {
    axios.get(`${server}`).then((result) => {
      const emojis = result.data;
      const emojiSelected = [];
      // start each emoji as non-selected
      emojis.map(() => emojiSelected.push(false));
      this.setState({
        emojiList: emojis,
        emojiSelect: emojiSelected,
      });
    }, (e) => {
      console.log('error', e);
    });
  }

  addEmoji(emoji, id) {
    let check = -1;
    const {
      emojiSelect,
      emojiString,
    } = this.state;
    // CONVERT TO OBJECT WITH PROPERTY .SELECTED
    // emojiString: list of emojis
    // emojiSelect: selected Emojis - set that index to true
    emojiSelect[id] = !emojiSelect[id];
    emojiString.forEach((item, i) => {
      if (_.isEqual(emoji, item)) {
        check = i;
      }
    });
    if (check !== -1) {
      emojiString.splice(check, 1);
    } else {
      emojiString.push(emoji);
    }
    this.setState({
      emojiSelect,
      emojiString,
    });
    this.handleEmojiList();
  }

  formatEmojiString(emojiList) {
    let estring = '';
    for (const e of emojiList) {
      estring += `${e.unicode}_`;
    }
    estring = estring.slice(0, -1);
    return estring;
  }

  render() {
    const emojis = this.state.emojiList;
    const { emojiSelect } = this.state;
    const emojisListOne = emojis.slice(0, emojis.length);

    return (
      <Template>
        <Wrapper>
          {emojisListOne.map((emoji, i) => (emojiSelect[i] ?
            <EmojibtnSelect id={`emoji__${i}`} onClick={this.addEmoji.bind(this, emoji, i)}>{emoji.emoji}</EmojibtnSelect> :
            <Emojibtn id={`emoji__${i}`} onClick={this.addEmoji.bind(this, emoji, i)}>{emoji.emoji}</Emojibtn>
          ))}
        </Wrapper>
      </Template>
    );
  }
}

const Wrapper = styled.div`
  height: 5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Emojibtn = styled.button`
  background-color:inherit;
  padding: 0;
  margin: 5px;
  border: none;
  background:none;
  font-size: 1.7em;
  transition: all .3s;

  &:hover, &:active, &:focus {
    transform: scale(1.5);
    box-shadow: transparent;
    outline: none;
  }
`;

const EmojibtnSelect = Emojibtn.extend`
  transform: scale(1.5);
`;

const Template = styled.div`
  margin-top: 1em;
`;

export default connect(null, { updateEmojiList, updateAdditionalProps })(Emoji);
