import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Icon from '@srnd/topocons';
import styled from 'styled-components';

const UiContainer = styled.div`
  position: absolute;
  top: 48.5vh;
  z-index: 100;
  color: #fff;
  font-size: 3vh;

  svg {
    cursor: pointer;
    -webkit-filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .9));
    filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .9));
    opacity: 0.5;
  }
`;

export default class Deck extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.navigate = this.navigate.bind(this);
    this.state = {
      currentSlide: 0,
      volume: 100,
    };
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }

  onKeyDown(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      this.navigate(1);
    } else if (e.key === 'ArrowLeft') {
      this.navigate(-1);
    }
  }

  navigate(amount) {
    const { children } = this.props;
    const { currentSlide } = this.state;
    const newSlide = currentSlide + amount;
    const boundedNewSlide = Math.max(0, Math.min(newSlide, children.length - 1));

    this.setState({
      currentSlide: boundedNewSlide,
    });
  }

  render() {
    const { children } = this.props;
    const { currentSlide, volume } = this.state;

    const displaySlide = React.cloneElement(children[currentSlide], {
      ...this.props,
      volume,
      nextSlide: () => this.navigate(1),
      prevSlide: () => this.navigate(-1),
    });

    return (
      <div>
        <Head>
          <link rel="stylesheet" href="https://f1.srnd.org/fonts/gosha-sans/all.css" />
        </Head>
        {currentSlide > 0 && (
          <UiContainer style={{ left: '1vh' }} onClick={() => this.navigate(-1)}>
            <Icon.UiArrowLeft />
          </UiContainer>
        )}
        {currentSlide < (children.length - 1) && (
          <UiContainer style={{ right: '1vh' }} onClick={() => this.navigate(1)}>
            <Icon.UiArrowRight />
          </UiContainer>
        )}

        <UiContainer style={{
          top: 'auto', bottom: '1vh', right: '1vh', fontSize: '2vh',
        }}
        >
          <Icon.UiVolumeLower onClick={() => this.setState({ volume: Math.max(0, volume - 10) })} />&nbsp;
          <Icon.UiVolume onClick={() => this.setState({ volume: Math.min(100, volume + 10) })} />
        </UiContainer>

        {displaySlide}
      </div>
    );
  }
}
