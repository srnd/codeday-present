import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Slide } from '../screen';
import { Title } from '../screen/text';

const PartnerBox = styled.div`
  height: 30vh;
  overflow: hidden;
  margin-bottom: 4vh;
`;

const PartnerLogo = styled.div`
  width: 25%;
  margin-right: 5%;
  height: 100%;
  display: inline-block;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: 0% 50%;
  background-size: contain;
`;

const PartnerInfo = styled.div`
  font-size: 3.5vh;
  width: 65%;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  margin: 0;
`;

export default class CommunityPartners extends React.Component {
  static propTypes = {
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { communityPartners } = this.props;

    return (
      <Slide>
        <Title>What&apos;s next for you? Some local ideas:</Title>
        {communityPartners.map((partner) => (
          <PartnerBox>
            <PartnerLogo style={{ backgroundImage: `url(${partner.logo.large.url})` }} />
            <PartnerInfo>
              <p>{partner.display_url}</p>
              <p>{partner.blurb}</p>
            </PartnerInfo>
          </PartnerBox>
        ))}
      </Slide>
    );
  }
}
