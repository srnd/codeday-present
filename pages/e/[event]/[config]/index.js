/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { parseCode } from '../../../../components/settings';
import Srnd from '../../../../server/srndApi';

const ColorList = styled.ul`
  padding: 0;
  li {
    list-style-type: none;
  }
`;

const ColorLink = styled.a`
  display: block;
  padding: 2rem;
  font-size: 3rem;
  color: ${({ fg }) => fg};
  background-color: ${({ bg }) => bg};
  text-align: center;
  text-decoration: none;
`;

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    return {
      event: await Srnd.getEventInfo(router.query.event),
      config: parseCode(router.query.config),
    };
  }

  render() {
    const { event, config, router } = this.props;
    return (
      <div>
        <Head>
          <title>{`${event.name} Display Menu`}</title>
        </Head>
        <h1 style={{ textAlign: 'center' }}>Hi there, {event.name}!</h1>
        <ColorList>
          { config.radio && (
            <li>
              <ColorLink
                target="_blank"
                bg="#B33739"
                fg="#fff"
                href={`/e/${event.id}/${router.query.config}/radio`}
              >
                Radio Player
              </ColorLink>
            </li>
          )}
          <li>
            <ColorLink
              target="_blank"
              bg="#4087B3"
              fg="#fff"
              href={`/e/${event.id}/${router.query.config}/kickoff`}
            >
              Kickoff Deck
            </ColorLink>
          </li>
          <li>
            <ColorLink
              target="_blank"
              bg="#3F97CC"
              fg="#fff"
              href={`/e/${event.id}/${router.query.config}/videos`}
            >
              Kickoff Videos Only
            </ColorLink>
          </li>
          <li>
            <ColorLink
              target="_blank"
              bg="#25B34C"
              fg="#fff"
              href={`/e/${event.id}/${router.query.config}/live`}
            >
              Live Schedule
            </ColorLink>
          </li>
          <li>
            <ColorLink
              target="_blank"
              bg="#FFFD82"
              fg="#000"
              href={`/e/${event.id}/${router.query.config}/awards`}
            >
              Awards Deck
            </ColorLink>
          </li>
        </ColorList>
      </div>
    );
  }
});
