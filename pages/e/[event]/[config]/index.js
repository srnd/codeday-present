import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Srnd from '../../../../server/srndApi'

export default withRouter(class Index extends React.Component {
  static async getInitialProps(router) {
    return {event: await Srnd.getEventInfo(router.query.event)}
  }
  render() {
    return <>
      <Head>
        <title>{this.props.event.name} Display Menu</title>
      </Head>
      <h1>{this.props.event.name}</h1>
      <ul>
        <li><Link><a href={`/e/${this.props.event.id}/${this.props.router.query.config}/kickoff`}>Kickoff Display</a></Link></li>
      </ul>
    </>;
  }
})