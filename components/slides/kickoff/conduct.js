import React from 'react'
import Base, { Title, LargeText} from '../base'
import styled from 'styled-components'

const FeaturedText = styled.span`
  color: #ff686b;
  text-decoration: underline;
`

const randomGif = () => {
  const gifs = [
    'welcome-club.gif',
    'welcome-dog.gif',
    'welcome-robot.gif',
    'welcome-robot.gif',
  ]
  return 'https://f1.srnd.org/gifs/'+gifs[Math.floor(Math.random()*gifs.length)];
}

export default () => <Base bg="#ff686b" fg="#fff">
  <Title>CodeDay is a community. (Welcome!)</Title>
  <img src={randomGif()} style={{height: '35vh'}} />
  <LargeText>
    - Please be friendly and welcoming.<br />
    - Keep things safe and legal. Don't harass people.
  </LargeText>
</Base>