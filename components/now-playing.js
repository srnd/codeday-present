import React from 'react';
import superagent from 'superagent';
import propTypes from 'prop-types';
import styled from 'styled-components';
import FlipFlop from './screen/flipflop';
import { BgSectionText } from './screen/text';

const NowPlayingBlock = styled.div`
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  text-align: ${({ align }) => align};
`;

const NowPlayingAlbum = styled.div`
  height: 7vh;
  width: 7vh;
  float: ${({ align }) => align};
  ${({ align }) => align === 'left' ? 'margin-right' : 'margin-left'}: 1vw;
  background-color: rgba(255, 255, 255, 0.5);
  img {
    height: 100%;
    width: auto;
  }
`;

const NowPlayingSong = styled.div`
  font-size: 3vh;
  color: #fff;
`;

const NowPlayingArtist = styled.div`
  font-size: 2vh;
  color: #fff;
`;

const HowTo = styled.div`
  clear: both;
  font-size: 2vh;
  color: #fff;
`;

export default class NowPlaying extends React.Component {
  static propTypes = {
    align: propTypes.string,
  }

  defaultProps = {
    align: 'left',
  }

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
    try {
      const nowPlaying = (await superagent.get('https://micro.srnd.org/now-playing')).body;
      this.setState({ nowPlaying });
    } catch (ex) {
      this.setState({ nowPlaying: null });
    }
  }

  render() {
    const { nowPlaying } = this.state;
    const { align } = this.props;
    return (
      <NowPlayingBlock align={align}>
        <BgSectionText>Now Playing</BgSectionText>
        <FlipFlop interval={20000}>
          <div>
            <NowPlayingAlbum align={align}>
              {nowPlaying && <img src={nowPlaying.image} alt="" />}
            </NowPlayingAlbum>
            <NowPlayingSong>{nowPlaying ? nowPlaying.title : 'Nothing'}</NowPlayingSong>
            <NowPlayingArtist>{nowPlaying ? nowPlaying.artist : 'No One'}</NowPlayingArtist>
          </div>
          <div>
            <NowPlayingSong>@DjJohnPeter</NowPlayingSong>
            <NowPlayingArtist>Tweet me a song name to queue it.</NowPlayingArtist>
          </div>
        </FlipFlop>
      </NowPlayingBlock>
    );
  }
}
