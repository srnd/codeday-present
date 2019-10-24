import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Srnd from '../../../../server/srndApi';
import Deck from '../../../../components/screen/deck';
import {
  Congrats,
  CommunityPartners,
  Hackathons,
  Help,
  Criteria,
  Award,
  Thanks,
} from '../../../../components/awards';

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
    hackathons: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static async getInitialProps(router) {
    const event = await Srnd.getEventInfo(router.query.event);
    const [communityPartners, hackathons] = await Promise.all([
      Srnd.getCommunityPartners(event),
      Srnd.getHackathons(event),
    ]);

    return {
      event,
      communityPartners,
      hackathons,
    };
  }

  groupsOf(items, groupSize) {
    if (items.length === 0) return [];
    const out = [[]];
    items.forEach((item) => {
      if (out[out.length - 1].length >= groupSize) {
        out.push([]);
      }
      out[out.length - 1].push(item);
    });
    return out;
  }

  render() {
    const { event, communityPartners, hackathons } = this.props;
    const groupedPartners = this.groupsOf(communityPartners, 2);
    const groupedHackathons = this.groupsOf(hackathons, 10);

    return (
      <div>
        <Head>
          <title>{`${event.name} Kickoff`}</title>
        </Head>
        <Deck event={event}>
          <Congrats />
          {groupedPartners.map((partnerGroup) => <CommunityPartners communityPartners={partnerGroup} />)}
          {groupedHackathons.map((hackathonGroup) => <Hackathons hackathons={hackathonGroup} />)}
          <Help />
          <Criteria />
          <Award bestInClass />
          <Award bestInShow />
          <Award special />
          <Thanks />
        </Deck>
      </div>
    );
  }
});
