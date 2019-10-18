import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';

import { updateEmojiList } from '../redux/actions';

const server = 'https://emojistoemotions.herokuapp.com/emojicollection';

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

  handleEmojiList = () => {
    const { emojiString } = this.state;
    this.props.updateEmojiList(this.formatEmojiString(emojiString));
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
    // create 2 lists to display
    const emojisListOne = emojis.slice(0, emojis.length / 2);
    const emojisListTwo = emojis.slice(emojis.length / 2, emojis.length);

    return (
      <Template>
        <Wrapper>
          {emojisListOne.map((emoji, i) => (emojiSelect[i] ?
            <EmojibtnSelect id={`emoji__${i}`} onClick={this.addEmoji.bind(this, emoji, i)}>{emoji.emoji}</EmojibtnSelect> :
            <Emojibtn id={`emoji__${i}`} onClick={this.addEmoji.bind(this, emoji, i)}>{emoji.emoji}</Emojibtn>
          ))}
        </Wrapper>
        <Wrapper>
          {emojisListTwo.map((emoji, i) => (emojiSelect[i + emojis.length / 2] ?
            <EmojibtnSelect id={`emoji__${i + emojis.length / 2}`} onClick={this.addEmoji.bind(this, emoji, i + emojis.length / 2)}>{emoji.emoji}</EmojibtnSelect> :
            <Emojibtn id={`emoji__${i + emojis.length / 2}`} onClick={this.addEmoji.bind(this, emoji, i + emojis.length / 2)}>{emoji.emoji}</Emojibtn>
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

export default connect(null, { updateEmojiList })(Emoji);