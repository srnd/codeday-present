import React from 'react';
import superagent from 'superagent';
import styled from 'styled-components';

const NowPlayingBlock = styled.div`
`;

const NowPlayingAlbum = styled.div`
  height: 5vh;
  img {
    height: 100%;
    width: auto;
  }
`;

const NowPlayingSong = styled.div`
  font-size: 3vh;
`;

const NowPlayingArtist = styled.div`
  font-size: 2vh;
`;

export default class NowPlaying extends React.Component {
  state = {
    nowPlaying: false,
  }

  updateIntervalId = null;

  componentDidMount() {
    this.updateNowPlaying();
    this.updateIntervalId = setInterval(() => this.updateNowPlaying(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalId);
  }

  async updateNowPlaying() {
    const nowPlaying = (await superagent.get('https://micro.srnd.org/now-playing')).body;
    this.setState({ nowPlaying });
  }

  render() {
    const { nowPlaying } = this.state;
    return (
      <NowPlayingBlock>
        <NowPlayingAlbum>
          <img src={nowPlaying.image} alt="" />
        </NowPlayingAlbum>
        <NowPlayingSong>{nowPlaying ? nowPlaying.title : 'Nothing'}</NowPlayingSong>
        <NowPlayingArtist>{nowPlaying ? nowPlaying.artist : 'No One'}</NowPlayingArtist>
      </NowPlayingBlock>
    );
  }
}
