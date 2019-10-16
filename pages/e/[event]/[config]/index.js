import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { parseCode } from '../../../../components/settings';
import Srnd from '../../../../server/srndApi';

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
        <h1>{event.name}: All Displays</h1>
        <ul>
          <li><Link href={`/e/${event.id}/${router.query.config}/kickoff`}>Kickoff Full Deck</Link></li>
          <li><Link href={`/e/${event.id}/${router.query.config}/videos`}>Kickoff Videos Only</Link></li>
          <li><Link href={`/e/${event.id}/${router.query.config}/live`}>Live Schedule</Link></li>
          { config.radio && <li><Link href={`/e/${event.id}/${router.query.config}/radio`}>Radio Player</Link></li> }
        </ul>
      </div>
    );
  }
});
