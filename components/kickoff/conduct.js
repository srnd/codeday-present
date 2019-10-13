import React from 'react';
import { Slide } from '../screen';
import { Title, Large } from '../screen/text';

const randomGif = () => {
  const gifs = [
    'welcome-club.gif',
    'welcome-dog.gif',
    'welcome-robot.gif',
    'welcome-robot.gif',
  ];
  return `https://f1.srnd.org/gifs/${gifs[Math.floor(Math.random() * gifs.length)]}`;
};

export default () => (
  <Slide bg="#ff686b" fg="#fff">
    <Title>CodeDay is a community. (Welcome!)</Title>
    <img src={randomGif()} style={{ height: '35vh' }} alt="" />
    <Large block>- Please be friendly and welcoming.</Large>
    <Large block>- Keep things safe and legal. Don&apos;t harass people.</Large>
  </Slide>
);
