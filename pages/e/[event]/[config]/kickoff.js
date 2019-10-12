import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Srnd from '../../../../server/srndApi'
import { parseCode } from '../../../../components/settings'
import Kickoff from '../../../../components/kickoff'

export default withRouter(class Index extends React.Component {
  static async getInitialProps(router) {
    return {
      event: await Srnd.getEventInfo(router.query.event),
      globalSponsors: await Srnd.getGlobalSponsors(),
      config: parseCode(router.query.config)
    }
  }
  render() {
    return <>
      <Head>
        <title>{this.props.event.name} Kickoff</title>
      </Head>
      <Kickoff event={this.props.event} config={this.props.config} globalSponsors={this.props.globalSponsors} />
    </>;
  }
})