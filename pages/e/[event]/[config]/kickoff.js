import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Srnd from '../../../../server/srndApi';
import { parseCode } from '../../../../components/settings';
import Kickoff from '../../../../components/kickoff';

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    globalSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
    config: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    return {
      event: await Srnd.getEventInfo(router.query.event),
      globalSponsors: await Srnd.getGlobalSponsors(),
      config: parseCode(router.query.config),
    };
  }

  render() {
    const { event, config, globalSponsors } = this.props;

    return (
      <div>
        <Head>
          <title>{`${event.name} Kickoff`}</title>
        </Head>
        <Kickoff event={event} config={config} globalSponsors={globalSponsors} />
      </div>
    );
  }
});
