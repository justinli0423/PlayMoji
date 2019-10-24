import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import Form from './components/PlaylistForm';
import { Login, Button } from './components/Button';
import { setAccessToken, setUserId } from './redux/actions';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = this.props;
    this.state = { accessToken: cookies.get('access_token') || null };
  }

  componentWillMount() {
    const { cookies } = this.props;
    // query param of log-in url for access token
    const params = new URLSearchParams(window.location.hash.slice(1));
    let accessToken = params.get('access_token');

    if (accessToken) {
      cookies.set('access_token', accessToken);
      // cannot use reload here
      window.location = window.location.pathname;
      // set the accessToken to global store
    }

    accessToken = cookies.get('access_token');
    this.setState({ accessToken });
    this.handleAccessToken();

    axios.get('https://api.spotify.com/v1/me', { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((data) => {
        this.setState({ id: data.data.id, display: data.data.display_name });
        this.handleUserId();
      }, (e) => {
      // console.log(e);
        if (e.response.status === 401 && accessToken != null) {
          console.log('Token has expired, logging out');
          cookies.remove('access_token');
          window.location.reload();
        }
      });
  }

  logout() {
    const { cookies } = this.props;
    console.log('Logging out');
    cookies.remove('access_token');
    this.setState({ id: undefined, display: undefined, accessToken: '' });
    this.handleAccessToken();
    this.handleUserId();
    window.location.reload();
  }

  handleAccessToken = () => {
    const { accessToken } = this.state;
    this.props.setAccessToken(accessToken);
  }

  handleUserId = () => {
    const { id } = this.state;
    this.props.setUserId(id);
  }

  render() {
    const { accessToken, display, id } = this.state;
    return (
      <Container>
        <WrapperFlex>
          <Title>playmoji</Title>
          {!accessToken && <Login label="Sign in" />}
          {accessToken && <Form />}
        </WrapperFlex>
        {accessToken &&
        <Welcome>
          <UserName>{display || id}</UserName>
          <Button onClick={this.logout.bind(this)}>Logout</Button>
          <br />
        </Welcome>
        }
      </Container>
    );
  }
}

const Title = styled.h1`
  text-align: center;
  font-size: 5em;
`;

const UserName = styled.h1`
  text-align: center;
  font-size: 2em;
  margin-top: 20pt;
`;

const WrapperFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
  flex-shrink: 1;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const Welcome = styled.div`
  display: block;
  position: absolute;
  cursor: default;
  padding: 0 2em;
  top: 0;
  right: 0;
  margin: 0;
  font-size: 1em;
`;

const Container = styled.div`
  display: block;
  width: 100vw;
  height: 100vh;
`;

export default connect(null, { setAccessToken, setUserId })(withCookies(App));
