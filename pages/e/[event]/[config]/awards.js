import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Srnd from '../../../../server/srndApi';
import Deck from '../../../../components/screen/deck';
import {
  Congrats,
  CommunityPartners,
  Help,
  Criteria,
  Award,
  Thanks,
} from '../../../../components/awards';

export default withRouter(class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    communityPartners: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static async getInitialProps(router) {
    const result = {
      event: await Srnd.getEventInfo(router.query.event),
    };
    result.communityPartners = await Srnd.getCommunityPartners(result.event);

    return result;
  }

  render() {
    const { event, communityPartners } = this.props;
    const groupedPartners = [[]];
    communityPartners.forEach((partner) => {
      if (groupedPartners[groupedPartners.length - 1].length >= 2) {
        groupedPartners.push([]);
      }

      groupedPartners[groupedPartners.length - 1].push(partner);
    });

    return (
      <div>
        <Head>
          <title>{`${event.name} Kickoff`}</title>
        </Head>
        <Deck event={event}>
          <Congrats />
          {groupedPartners.map((partners) => <CommunityPartners communityPartners={partners} />)}
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
