import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import Url from 'url';
import QueryString from 'querystring';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

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
  static propTypes = {
    event: PropTypes.object.isRequired,
    nextSlide: PropTypes.func,
  }

  static defaultProps = {
    nextSlide: () => {},
  }

  render() {
    const { event, nextSlide } = this.props;
    if (!event.kickoffVideo) {
      return (
        <Slide>
          <Title>Kickoff Video</Title>
          <Large>There is none! :O</Large>
        </Slide>
      );
    }

    const videoId = QueryString.parse(Url.parse(event.kickoffVideo).query).v;
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
      },
    };

    return (
      <Slide bg="#000">
        <VideoWrapper>
          <YouTube
            videoId={videoId}
            opts={opts}
            autoplay
            onEnd={nextSlide}
          />
        </VideoWrapper>
      </Slide>
    );
  }
}
