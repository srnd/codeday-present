import React from 'react';
import styled, { keyframes } from 'styled-components';
import Typist from 'react-typist-n10';
import { Slide } from '../screen';

const KeyframesBlink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const CongratsText = styled.h1`
  font-size: 18vh;
  small {
    font-size: 3vh;

    .Typist .Cursor--blinking {
      opacity: 1;
      animation: ${KeyframesBlink} 1s linear infinite;
    }
  }
`;

export default class Congrats extends React.Component {
  render() {
    return (
      <Slide bg="#ff686b" fg="#fff">
        <CongratsText>
          We Did The CodeDay!<br />
          <small>
            <Typist cursor={{ blink: true, hideWhenDelay: true, hideWhenDone: true }} repeat>
              <span>WOW</span>
              <Typist.Backspace count={3} delay={4000} />
              <span>Incredible.</span>
              <Typist.Backspace count={11} delay={4000} />
              <span>Can&apos;t believe we did it.</span>
              <Typist.Backspace count={24} delay={4000} />
              <span>WOOOOOOOOOOW</span>
              <Typist.Backspace count={12} delay={4000} />
              <span>So crazy!</span>
              <Typist.Backspace count={9} delay={4000} />
              <span>Is this real life?</span>
              <Typist.Backspace count={18} delay={4000} />
              <span>Help, I&apos;m trapped in this slide deck.</span>
              <Typist.Backspace count={39} delay={4000} />
            </Typist>
          </small>
        </CongratsText>
      </Slide>
    );
  }
}
