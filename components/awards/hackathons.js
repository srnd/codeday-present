import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Slide } from '../screen';
import { Title, Cite } from '../screen/text';

const HackathonBox = styled.div`
  height: 30vh;
  width: 35vh;
  overflow: hidden;
  margin-right: 4vh;
  margin-bottom: 1vh;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
`;

const HackathonLogo = styled.div`
  width: 100%;
  margin-right: 5%;
  height: 60%;
  display: block;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: 0% 50%;
  background-size: cover;
  padding: 4vh;
  box-sizing: border-box;

  img {
    max-height: 100%;
  }
`;

const HackathonInfo = styled.div`
  font-size: 2.5vh;
  vertical-align: top;
`;

export default class Hackathons extends React.Component {
  static propTypes = {
    hackathons: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { hackathons } = this.props;

    return (
      <Slide>
        <Title>Hackathons &mdash; like CodeDay but more competitive:</Title>
        {hackathons.map((hackathon) => hackathon && (
          <HackathonBox>
            <HackathonLogo
              style={{
                backgroundImage: hackathon.background
                  && `linear-gradient(#0000 0%, #00000060 75%), url(${hackathon.background})`,
              }}
            >
              <img src={hackathon.logo} alt={hackathon.name} />
            </HackathonLogo>
            <HackathonInfo>
              {hackathon.name}<br />
              {moment(hackathon.date, 'YYYY-MM-DD').format('MM/DD')} in {hackathon.location}<br />
              {hackathon.display_url}
            </HackathonInfo>
          </HackathonBox>
        ))}
        <Cite>(Data from hackathons.hackclub.com. We are not associated with any of these events.)</Cite>
      </Slide>
    );
  }
}
