import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from './data/Colors';

const server = 'https://emojistoemotions.herokuapp.com/emojicollection';

export class Emoji extends Component {
  constructor(props){
    super(props);
    this.state = {
      emoji_list:[],
      emoji_string:[],
    };
  }

  emojiGet(){
      axios.get(`${server}`).then((result)=>{
        let songs = result.data;
        this.setState({
          emoji_list: songs
        });
      },(e)=>{
        console.log('error',e);
      });
  }
  componentWillMount(){
    this.emojiGet();
    this.setState({
      emoji_list: []
    })
  
  }

  addEmoji(emoji){
    var curr = this.state.emoji_string;
    curr.push(emoji);
    this.setState({emoji_string:curr});

    this.props.emojiCallback(this.formatEmojiString(this.state.emoji_string));
  }

  formatEmojiString(emoji_list){
    var estring = '';
    for(let e of emoji_list){
      estring += `${e.unicode}_`;
    }
    estring = estring.slice(0,-1);

    return estring;
  }

  render() {
    let emojis = this.state.emoji_list;
    let emojis_1 = emojis.slice(0, emojis.length/2);
    let emojis_2 = emojis.slice(emojis.length/2, emojis.length);
    return (
      <Template>
        <Wrapper>
          {emojis_1.map((emoji, i) => {
            return (<Emojibtn onClick={this.addEmoji.bind(this,emoji)}>{emoji.emoji}</Emojibtn>)          
          })}
        </Wrapper>
        <Wrapper>
          {emojis_2.map((emoji, i) => {
            return (<Emojibtn onClick={this.addEmoji.bind(this,emoji)}>{emoji.emoji}</Emojibtn>)          
          })}
        </Wrapper>
        <WrapperSelect>
        {this.state.emoji_string.map((e,i)=>{
          return (<Emojis>{e.emoji}</Emojis>)
        })}
        </WrapperSelect>
      </Template> 
    );
  }
};

const Title = styled.h1`
  padding-top: 1em;
  font-size: 2em;
  text-align: center;  
`;

const Emojis = styled.p`
  font-size: 2em;
`;

const Wrapper = styled.div`
  padding-top:20px;
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
  font-size: 2em;
  transition: all .3s;

  &:hover {
    font-size: 3.5em;
    margin-left: -5.5px;
    margin-right: -5px;
  }

  &:focus {
    box-shadow: transparent;
    outline: none;
  }
  
`;

const WrapperSelect = Wrapper.extend`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);

`;

const Template = styled.div`
  height: 13em;
`;