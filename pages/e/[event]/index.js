import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import Srnd from '../../../server/srndApi'
import Settings from '../../../components/settings'

export default class Index extends React.Component {
  static async getInitialProps(router) {
    return {event: await Srnd.getEventInfo(router.query.event)}
  }
  render() {
    return <>
      <Head>
        <title>{this.props.event.name} Settings</title>
      </Head>
      <h1>{this.props.event.name}</h1>
      <Settings event={this.props.event} />
    </>;
  }
}