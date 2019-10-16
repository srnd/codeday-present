import React from 'react';
import PropTypes from 'prop-types';
import { Slide } from '../screen';
import { Provider as ScheduleProvider, Upcoming } from './schedule';
import NowPlaying from './now-playing';

export default class Live extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  render() {
    const { event, config } = this.props;
    return (
      <Slide>
        <ScheduleProvider event={event}>
          <Upcoming />
        </ScheduleProvider>
        {config.radio && <NowPlaying />}
      </Slide>
    );
  }
}
