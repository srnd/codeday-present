import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Srnd from '../../../../server/srndApi';
import { parseCode } from '../../../../components/settings';
import Deck from '../../../../components/screen/deck';
import {
  Title,
  Video,
  VideoSponsors,
  CreateCode,
  Judging,
  Conduct,
  Schedule,
  Sponsors,
  Pitches,
  Theme,
} from '../../../../components/kickoff';

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    globalSponsors: PropTypes.arrayOf(PropTypes.object).isRequired,
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
    config: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    const [event, globalSponsors] = await Promise.all([
      Srnd.getEventInfo(router.query.event),
      Srnd.getGlobalSponsors(),
    ]);
    const communityPartners = await Srnd.getCommunityPartners(event);

    return {
      event,
      globalSponsors,
      communityPartners,
      config: parseCode(router.query.config),
    };
  }

  render() {
    const {
      event,
      config,
      globalSponsors,
      communityPartners,
    } = this.props;

    return (
      <div>
        <Head>
          <title>{`${event.name} Kickoff`}</title>
        </Head>
        <Deck event={event} config={config} globalSponsors={globalSponsors} communityPartners={communityPartners}>
          <Title />
          <Video />
          <VideoSponsors />
          <CreateCode />
          {event.theme ? <Theme /> : null}
          <Judging />
          <Conduct />
          <Schedule />
          <Sponsors />
          <Pitches />
        </Deck>
      </div>
    );
  }
});
