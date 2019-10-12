import React from 'react'

export default class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      slides: this.props.slides
    }
  }
  componentDidMount() {
    if (typeof('window') !== 'undefined') {
      document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }
  }

  componentWillUnmount() {
    if (typeof('window') !== 'undefined') {
      document.addEventListener('keydown', (e) => this.onKeyDown(e));
    }
  }

  render() {
    return React.cloneElement(this.props.slides[this.state.currentSlide], {
      nextSlide: () => this.nextSlide(),
      prevSlide: () => this.prevSlide()
    });
  }

  onKeyDown(e) {
    if (e.key == 'ArrowRight' || e.key == ' ') {
      this.nextSlide()
    } else if (e.key == 'ArrowLeft') {
      this.prevSlide()
    }
  }

  nextSlide() {
    if (this.state.currentSlide < this.props.slides.length-1) this.setState({currentSlide: this.state.currentSlide+1});
  }

  prevSlide() {
    if (this.state.currentSlide > 0) this.setState({currentSlide: this.state.currentSlide-1});
  }
}