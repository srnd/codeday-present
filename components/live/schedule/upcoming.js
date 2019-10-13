import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EventBox = styled.li`

`;

export default class Upcoming extends React.Component {
  static propTypes = {
    upcomingEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  render() {
    const { upcomingEvents } = this.props;

    return (
      <div>
        <ul>
          {upcomingEvents.map((evt) => <EventBox>{evt.title} ({evt.moment.fromNow()})</EventBox>)}
        </ul>
      </div>
    );
  }
}
