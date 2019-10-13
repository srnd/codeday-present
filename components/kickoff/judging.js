import React from 'react';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

const FeaturedText = styled.span`
  color: #ff686b;
  text-decoration: underline;
`;

const AwardBlock = styled.div`
  text-align: center;

  ${Large} {
    font-size: 4vh;
  }

  img {
    max-width: 40vh;
    padding: 3vh 2vh;
    vertical-align: top;
  }
`;

export default () => (
  <Slide>
    <AwardBlock>
      <Title>
        Awards based on <FeaturedText>difficulty</FeaturedText> and <FeaturedText>creativity.</FeaturedText>
      </Title>
      <div>
        <img src="https://f1.srnd.org/codeday/awards/HoloBestInShow.png" alt="Best in Show" />
        <img src="https://f1.srnd.org/codeday/awards/HoloBestInClassStack.png" alt="Best in Class (2x)" />
        <img src="https://f1.srnd.org/codeday/awards/HoloSpecialStack.png" alt="Special Prize (3x)" />
      </div>
      <Large>(Try something new &amp; have fun. We&apos;re not very competitive.)</Large>
    </AwardBlock>
  </Slide>
);
