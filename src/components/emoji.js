import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Colors from './data/Colors';

const server = 'https://emojistoemotions.herokuapp.com/emojicollection';

export class Emoji extends Component {
  constructor(props){
    super(props);
    this.state = {
      emoji_list:[]
    };
  }

  emojiGet(){
      console.log('asdf');
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

  render() {
    console.log('asdf');    
    return (
      <Wrapper>

      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Content = styled.div`

`;