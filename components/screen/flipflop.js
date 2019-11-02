import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FlipBox = styled.div`
  overflow: hidden;
  white-space: nowrap;

  div {
    transition: all 1s ease-in;
  }
`;

const FlipComponent = styled.div`
  display: inline-block;
  width: 100%;
  margin-left: 0;
  opacity: 1;

  ${({ left, hide }) => (left && hide && 'margin-left: -100%;')}
  ${({ hide }) => (hide && 'opacity: 0;')}
`;

export default class FlipFlop extends React.Component {
  state = {
    element: 0,
  }

  propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    interval: PropTypes.number.isRequired,
  };

  flipFlopIntervalId = null;

  componentDidMount() {
    const { interval } = this.props;

    this.flipFlopIntervalId = setInterval(() => {
      const { element } = this.state;
      this.setState({ element: Number(!element) });
    }, interval);
  }

  componentWillUnmount() {
    clearInterval(this.flipFlopIntervalId);
  }

  render() {
    const { children } = this.props;
    const { element } = this.state;

    return (
      <FlipBox>
        <FlipComponent left hide={element !== 0}>{children[0]}</FlipComponent>
        <FlipComponent right hide={element !== 1}>{children[1]}</FlipComponent>
      </FlipBox>
    );
  }
}
