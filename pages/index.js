import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Srnd from '../server/srndApi';

export default class Index extends React.Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
  }

  static async getInitialProps(router) {
    return {
      events: await Srnd.getAllEvents(),
    };
  }

  render() {
    const { events } = this.props;

    return (
      <div>
        <h1>CodeDay Present</h1>
        <p>Pick a city...</p>
        <ul>
          {events.map((event) => (
            <li>
              <Link href={`/e/${event.id}`}>{event.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
