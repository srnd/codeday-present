import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from '../screen';
import { Provider as ScheduleProvider, Upcoming } from './schedule';

export default class Live extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  render() {
    const { event } = this.props;
    return (
      <Slide>
        <ScheduleProvider event={event}>
          <Upcoming />
        </ScheduleProvider>
      </Slide>
    );
  }
}