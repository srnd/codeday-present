import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import marky from 'marky-markdown';
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
  CustomSlide,
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
    const config = parseCode(router.query.config);
    const additionalSlides = config.additionalSlides ? config.additionalSlides
      .split("\n----\n")
      .map((md) => marky(md, { enableHeadingLinkIcons: false }))
      : null;

    return {
      event,
      globalSponsors,
      communityPartners,
      config,
      additionalSlides,
    };
  }

  render() {
    const {
      event,
      config,
      globalSponsors,
      communityPartners,
      additionalSlides,
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
          { additionalSlides ? additionalSlides.map(slide => <CustomSlide content={slide} />) : null }
          <Sponsors />
          <Pitches />
        </Deck>
      </div>
    );
  }
});
