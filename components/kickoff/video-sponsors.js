import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Sound from 'react-sound';
import rand from 'random-seed';
import Icon from '@srnd/topocons';
import { Slide } from '../screen';
import Text, { Large } from '../screen/text';

const SponsorLogoOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1;
  text-align: center;
  background: radial-gradient(
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.35) 30%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0)
  );
  opacity: ${({ backgroundMultiplier }) => backgroundMultiplier};

  img, svg {
     height: 20vh;
     margin-top: 40vh;
     color: #fff;
     font-size: 20vh;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%; 
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  min-width: 100%; 
  min-height: 100%; 
  width: auto; 
  height: auto;
  z-index: 0; 
  overflow: hidden;
  opacity: ${({ backgroundMultiplier }) => backgroundMultiplier};
`;

const Credit = styled.div`
  position: absolute;
  bottom: 1vh;
  left: 1vh;
  color: #fff;
  z-index: 10;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.9);
  opacity: 0.5;
`;

export default class VideoSponsors extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    globalSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
    nextSlide: PropTypes.func,
    volume: PropTypes.number,
  }

  static defaultProps = {
    nextSlide: () => {},
    volume: 100,
  }

  state = {
    visibleSponsorIndex: 0,
    play: null,
    error: null,
    backgroundMultiplier: 1.0,
  }

  componentDidMount() {
    const { nextSlide } = this.props;
    if (this.getSponsors().length <= 1) {
      setTimeout(nextSlide, 1000);
    }

    const autoplayTester = new Audio();
    autoplayTester.src = 'https://f1.srnd.org/audio-test.mp3';
    autoplayTester.volume = 1;
    autoplayTester.play()
      .then(() => this.setState({ play: true }))
      .catch(() => this.setState({ play: false }));
  }

  getBeeple() {
    const { event } = this.props;

    const beepleSrc = 'https://f1.srnd.org/beeple';
    const beepleAvailable = [
      'moonvirus',
      'strt',
      'xannn',
      '24k',
      'fiber-optical',
    ];
    const beeple = beepleAvailable[rand(event.batchName).intBetween(0, beepleAvailable.length)];
    return {
      img: `${beepleSrc}/${beeple}.jpg`,
      vid: `${beepleSrc}/${beeple}.mp4`,
      mus: `${beepleSrc}/${beeple}.mp3`,
    };
  }

  getSponsors() {
    const { globalSponsors } = this.props;

    return [
      { audio: 'https://f1.srnd.org/sponsor-intro.mp3' },
      ...globalSponsors.filter((s) => s.audio),
      {},
    ];
  }

  nextSponsor() {
    const { nextSlide } = this.props;
    const { visibleSponsorIndex } = this.state;
    this.setState({ visibleSponsorIndex: visibleSponsorIndex + 1 });

    if (visibleSponsorIndex >= this.getSponsors().length - 2) {
      // Fade out the audio
      const fadeDownIntervalId = setInterval(() => {
        let { backgroundMultiplier } = this.state;
        backgroundMultiplier *= 0.95;
        if (backgroundMultiplier <= 0.25) {
          clearTimeout(fadeDownIntervalId);
          nextSlide();
          return;
        }
        this.setState({ backgroundMultiplier });
      }, 50);
    }
  }

  render() {
    const {
      visibleSponsorIndex,
      play,
      error,
      backgroundMultiplier,
    } = this.state;
    const { volume } = this.props;

    const beeple = this.getBeeple();
    const sponsor = this.getSponsors()[visibleSponsorIndex];

    return (
      <Slide padding="0" bg="#000">
        <Credit>Loop: BEEPLE / Music: MAVS</Credit>
        <SponsorLogoOverlay backgroundMultiplier={backgroundMultiplier}>
          {error && <Text>Error: {error} (is the internet down/filtered?)</Text>}
          {!error && play && sponsor && sponsor.logo && <img src={sponsor.logo} alt={sponsor.name} />}
          {!error && play === false && this.getSponsors().length > 1 && (
            <Large onClick={() => this.setState({ play: true })} style={{ cursor: 'pointer' }}>
              <Icon.MediaPlay />
            </Large>
          )}
        </SponsorLogoOverlay>
        <BackgroundVideo poster={beeple.img} backgroundMultiplier={backgroundMultiplier} autoPlay muted loop>
          <source src={beeple.vid} type="video/mp4" />
        </BackgroundVideo>

        <Sound
          url={sponsor && sponsor.audio}
          volume={volume}
          playStatus={play ? Sound.status.PLAYING : Sound.status.STOPPED}
          onFinishedPlaying={() => setTimeout(() => this.nextSponsor(), 750)}
          onError={(x, e) => this.setState({ error: e })}
        />
        <Sound
          url={beeple.mus}
          loop
          volume={Math.max(1, Math.ceil(volume * 0.05)) * backgroundMultiplier}
          playStatus={play ? Sound.status.PLAYING : Sound.status.STOPPED}
        />
      </Slide>
    );
  }
}
