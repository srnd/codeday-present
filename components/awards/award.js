import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title } from '../screen/text';

const AwardBlock = styled.div`
  text-align: center;

  img {
    max-width: 40vh;
    padding: 3vh 2vh;
    vertical-align: top;
  }
`;

export default class Award extends React.Component {
  static propTypes = {
    bestInShow: PropTypes.bool,
    bestInClass: PropTypes.bool,
    special: PropTypes.bool,
  }

  static defaultProps = {
    bestInShow: false,
    bestInClass: false,
    special: false,
  }

  render() {
    const { bestInShow, bestInClass, special } = this.props;

    let award = 'Best In Show';
    if (bestInShow) award = 'Best In Show';
    else if (bestInClass) award = 'Best In Class';
    else if (special) award = 'Special';

    return (
      <Slide>
        <AwardBlock>
          <Title>Presenting Our &ldquo;{award}&rdquo; Winners...</Title>
          <div>
            <img src={`https://f1.srnd.org/codeday/awards/Holo${award.replace(/ /g, '')}.png`} alt={award} />
          </div>
        </AwardBlock>
      </Slide>
    );
  }
}
