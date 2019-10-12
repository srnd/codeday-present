import React from 'react'
import Base, { Title, LargeText} from '../base'
import styled from 'styled-components'

const FeaturedText = styled.span`
  color: #ff686b;
  text-decoration: underline;
`

const AwardBlock = styled.div`
  text-align: center;

  ${LargeText} {
    font-size: 4vh;
  }

  img {
    max-width: 40vh;
    padding: 3vh 2vh;
    vertical-align: top;
  }
`

export default () => <Base>
  <AwardBlock>
    <Title>Awards based on <FeaturedText>difficulty</FeaturedText> and <FeaturedText>creativity.</FeaturedText></Title>
    <div>
      <img src="https://f1.srnd.org/codeday/awards/HoloBestInShow.png" />
      <img src="https://f1.srnd.org/codeday/awards/HoloBestInClassStack.png" />
      <img src="https://f1.srnd.org/codeday/awards/HoloSpecialStack.png" />
    </div>
    <LargeText>(Try something new &amp; have fun. We're not very competitive.)</LargeText>
  </AwardBlock>
</Base>