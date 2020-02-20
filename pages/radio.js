/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { withRouter } from 'next/router';

export default withRouter(class Index extends React.Component {
  render() {
    return (
      <audio controls={true} preload="none" autoPlay>
        <source src={`https://radio.srnd.org/helloworld?type=.mp3&r=${Math.random()}`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    );
  }
});
