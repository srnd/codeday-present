import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

const RainbowKeyframes = keyframes`
  0%{background-position:0% 90%}
  50%{background-position:100% 11%}
  100%{background-position:0% 90%}
`;

const RainbowSlide = styled(Slide)`
  animation: ${RainbowKeyframes} 20s ease infinite;
  background: linear-gradient(318deg, #ff8900, #1ed74e, #00b9ff, #ff0000);
  background-size: 800% 800%;

  ${Title} {
    color: #fff;
    text-align: center;
    font-size: 15vh;
  }

  ${Large} {
    color: #fff;
    text-align: center;
  }
`;

export default () => (
  <RainbowSlide>
    <Title>Time for pitches!</Title>
    <Large block>You can pitch anything!</Large>
    <Large block>You don&apos;t need to know how to build it.</Large>
    <Large block>(You must pitch even if you already have a team.)</Large>
  </RainbowSlide>
);
