import React from 'react';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title } from '../screen/text';

const FeaturedText = styled.span`
  color: #a80003;
  text-decoration: underline;
`;

export default () => (
  <Slide bg="#ffc766">
    <img src="https://f1.srnd.org/gifs/helpcat.gif" alt="A cat cries help! in a tree." />
    <Title>We need <FeaturedText>you</FeaturedText> to make the next CodeDay happen.</Title>
    <Title>Students and parents: become an organizer or volunteer.<br /></Title>
    <Title>Talk to us after, or visit: <FeaturedText>CodeDay.org/Organize</FeaturedText></Title>
  </Slide>
);
