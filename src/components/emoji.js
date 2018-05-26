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
    return (
      <Template>
        <Wrapper>
          {emojis.map((emoji, i) => {
            return (<Emojibtn onClick={this.addEmoji.bind(this,emoji)}>{emoji.emoji}</Emojibtn>)          
          })}
        </Wrapper>
        <Wrapper>
        {this.state.emoji_string.map((e,i)=>{
          return (<p>{e.emoji}</p>)
        })}
        </Wrapper>
      </Template> 
    );
  }
};

const Wrapper = styled.div`
  padding-top:20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Emojibtn = styled.button`
  background-color:inherit;
  padding:0;
  border: none;
  background:none;
`;

const Content = styled.div`

`;

const Template = styled.div`

`;