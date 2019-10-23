import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title } from '../screen/text';
import Schedule from './schedule';
import NowPlaying from './now-playing';
import Social from './social';

const leftWidth = 30;

const ScheduleBox = styled.div`
  background-color: #ff686b;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 20vh;
  overflow: hidden;
  width: ${leftWidth}vw;
  padding:5vh 5vw;
  box-sizing: border-box;

  &:before {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4vw;
    background-image: linear-gradient(to right, rgba(255, 104, 107, 0), rgba(255, 104, 107, 1));
  }

  &:after {
    content: "";
    display: block;
    height: 15vh;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(rgba(255, 104, 107, 0), rgba(255, 104, 107, 1));
  }
`;

const RadioBox = styled.div`
  position: absolute;
  background-color: #ff686b;
  left: 0;
  bottom: 0;
  height: 20vh;
  width: ${leftWidth}vw;
  padding: 1vh 5vw 5vh 5vw;
  box-sizing: border-box;
`;

const SocialBox = styled.div`
  position: absolute;
  left: ${leftWidth}vw;
  top: 0;
  bottom: 5vh;
  right: 0;
  padding: 5vh 5vw 0 2vw;
  box-sizing: border-box;
  overflow: hidden;

  ${Title} {
    margin-top: 0;
  }

  &:after {
    content: "";
    display: block;
    height: 15vh;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  }
`;

export default class Live extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  render() {
    const { event, config } = this.props;
    return (
      <Slide padding="0">
        <Head>
          <link rel="stylesheet" href="https://f1.srnd.org/fonts/gosha-sans/all.css" />
        </Head>
        <ScheduleBox>
          <Schedule event={event} config={config} />
        </ScheduleBox>
        <RadioBox>
          {config.radio && <NowPlaying />}
        </RadioBox>
        <SocialBox>
          <Title>#codeday #{config.hashtag}</Title>
          <Social />
        </SocialBox>
      </Slide>
    );
  }
}
