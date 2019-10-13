import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Srnd from '../../../server/srndApi';
import Settings from '../../../components/settings';

export default class Index extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    return { event: await Srnd.getEventInfo(router.query.event) };
  }

  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  render() {
    const { event } = this.props;
    const { code } = this.state;

    return (
      <div>
        <Head>
          <title>{`${event.name} Settings`}</title>
        </Head>

        <h1>{`${event.name} Settings`}</h1>
        <p>These settings configure your displays.</p>
        <Settings onChange={(newCode) => this.setState({ code: newCode })} />
        {code && <Link href={`/e/${event.id}/${code}`}>Launch</Link>}
      </div>
    );
  }
}
