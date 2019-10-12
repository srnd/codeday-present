import React from 'react'
import YouTube from 'react-youtube'
import Url from 'url'
import QueryString from 'querystring'
import Base, { Title, LargeText } from '../base'
import styled from 'styled-components'

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  text-align: center;

  iframe {
    width: 90vw;
    height: calc(90vw/1.77);
    max-height: 90vh;
  }
`;

export default class Video extends React.Component {
  render() {
    if (!this.props.event.kickoffVideo) return <Base><Title>Kickoff Video</Title><LargeText>There is none! :O</LargeText></Base>;

    const videoId = QueryString.parse(Url.parse(this.props.event.kickoffVideo).query).v;
    const opts = {
      playerVars: {
        cc_load_policy: 1,
        controls: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        autoplay: 1,
      }
    }

    return <Base bg="#000">
      <VideoWrapper>
        <YouTube videoId={videoId} opts={opts}
          autoplay={true}
          onReady={(e) => setTimeout(() => e.target.playVideo(), 500)}
          onEnd={(e) => this.props.nextSlide()} />
      </VideoWrapper>
    </Base>;
  }
}