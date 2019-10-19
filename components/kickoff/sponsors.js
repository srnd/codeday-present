import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title } from '../screen/text';

const SponsorBox = styled.div`
  display: inline-block;
  width: ${({ minor }) => (minor ? '9vw' : '12vw')};
  height: ${({ minor }) => (minor ? '3vw' : '4vw')};
  margin: 0 3vw 3vw 0;
  background-size: contain;
  background-position: 50% 50%;
  background-repeat: no-repeat;
`;

const SmallTitle = styled(Title)`
  font-size: 4vh;
  margin-top: 0;
`;

export default class Sponsor extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    globalSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { event, globalSponsors, communityPartners } = this.props;
    const allSponsors = event.sponsors.concat(globalSponsors);

    return (
      <Slide>
        <Title style={{ marginBottom: '10vh' }}>A big thank-you to our sponsors!</Title>
        {allSponsors.map((sponsor) => (
          <SponsorBox style={{ backgroundImage: `url(${sponsor.logo})` }} />
        ))}

        <SmallTitle>Community partners:</SmallTitle>
        {communityPartners.filter((partner) => partner.logo && partner.logo.url).map((partner) => (
          <SponsorBox style={{ backgroundImage: `url(${partner.logo.url})` }} minor />
        ))}
      </Slide>
    );
  }
}
