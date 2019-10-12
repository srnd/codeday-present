import React from 'react'
import Base, { Title, LargeText} from '../base'
import styled from 'styled-components'

const SponsorBox = styled.div`
  display: inline-block;
  width: 15vw;
  height: 5vw;
  margin: 0 3vw 3vw 0;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
`

const Sponsor = ({info}) => <SponsorBox style={{backgroundImage: `url(${info.logo})`}} />

export default ({ event, globalSponsors }) => {
  return <Base>
    <Title style={{marginBottom: '10vh'}}>A big thank-you to our sponsors!</Title>
    {event.sponsors.map(sponsor => <Sponsor info={sponsor} key={sponsor.logo} />)}
    {globalSponsors.map(sponsor => <Sponsor info={sponsor} key={sponsor.logo} />)}    
  </Base>
}