import React from 'react';
import PropTypes from 'prop-types';

export default class Deck extends React.Component {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.element).isRequired,
  }

  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.navigate = this.navigate.bind(this);
    this.state = {
      currentSlide: 0,
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
    const { slides } = this.props;
    const { currentSlide } = this.state;
    const newSlide = currentSlide + amount;
    const boundedNewSlide = Math.max(0, Math.min(newSlide, slides.length - 1));

    this.setState({
      currentSlide: boundedNewSlide,
    });
  }

  render() {
    const { slides } = this.props;
    const { currentSlide } = this.state;

    return React.cloneElement(slides[currentSlide], {
      nextSlide: () => this.navigate(1),
      prevSlide: () => this.navigate(-1),
    });
  }
}
