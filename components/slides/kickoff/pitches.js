import React from 'react'
import Base, { Title, LargeText } from '../base'
import styled, {keyframes} from 'styled-components'

const RainbowKeyframes = keyframes`
  0%{background-position:0% 90%}
  50%{background-position:100% 11%}
  100%{background-position:0% 90%}
`
const RainbowSlide = styled(Base)`
  animation: ${RainbowKeyframes} 20s ease infinite;
  background: linear-gradient(318deg, #ff8900, #1ed74e, #00b9ff, #ff0000);
  background-size: 800% 800%;

  ${Title} {
    color: #fff;
    text-align: center;
    font-size: 15vh;
  }

  ${LargeText} {
    color: #fff;
    text-align: center;
  }
`

export default ({ event }) => <RainbowSlide>
  <Title>Time for pitches!</Title>
  <LargeText>You don't need to know how to build your idea.</LargeText>
  <LargeText>(You must pitch even if you already have a team.)</LargeText>
</RainbowSlide>