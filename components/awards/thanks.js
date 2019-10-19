import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Slide } from '../screen';

const RainbowKeyframes = keyframes`
  0%{background-position:0% 50%}
  50%{background-position:100% 25%}
  100%{background-position:0% 50%}
`;

const ThanksText = styled.h1`
  background-image: repeating-linear-gradient(45deg, #55b71e, #26a4c1, #8c309b, #d56b14);
  text-align: center;
  background-size: 800% 800%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${RainbowKeyframes} 25s ease infinite;
  font-size: 14vh;
`;

export default class Congrats extends React.Component {
  render() {
    return (
      <Slide>
        <ThanksText>THANK YOU!</ThanksText>
        <ThanksText>Get Some Sleep!</ThanksText>
      </Slide>
    );
  }
}
