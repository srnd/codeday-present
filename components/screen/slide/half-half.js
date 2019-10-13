import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slide from './index';

const HalfBox = styled.div`
  width: 50%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  padding: ${({ padding }) => padding};
`;


export default class HalfHalf extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    padding: PropTypes.string,
  }

  static defaultProps = {
    padding: '5vh 5vw',
  }

  render() {
    const { children, padding, ...other } = this.props;

    return (
      <Slide padding="0" {...other}>
        <HalfBox padding={padding}>{children[0]}</HalfBox><HalfBox padding={padding}>{children[1]}</HalfBox>
      </Slide>
    );
  }
}
