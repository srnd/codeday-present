import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import moment from 'moment-timezone';

export default class Provider extends React.Component {
  updateIntervalId = null;

  schedule = memoize((event) => {
    const result = {};
    Object
      .values(event.schedule)
      .reduce((a, b) => a.concat(b), [])
      .map((evt) => ({ ...evt, moment: moment.tz(evt.timestamp.date, evt.timestamp.timezone) }))
      .forEach((evt) => {
        const key = evt.timestamp.date;
        if (!(key in result)) {
          result[key] = [];
        }
        result[key].push(evt);
      });

    return Object.values(result);
  });

  static propTypes = {
    event: PropTypes.object.isRequired,
    children: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.element), PropTypes.element]).isRequired,
  }

  state = {
    currentEvents: [],
    upcomingEvents: [],
  }

  componentDidMount() {
    this.updateIntervalId = setInterval(() => this.updateEvents(), 1000);
  }

  componentWillUnmount() {
    if (this.updateIntervalId) {
      clearInterval(this.updateIntervalId);
    }
  }

  updateEvents() {
    const { event } = this.props;
    const now = moment();

    const upcomingEvents = this.schedule(event)
      .filter((time) => time[0].moment.diff(now) > 0)
      .reduce((a, b) => a.concat(b), []);

    const lastEventTimes = this.schedule(event)
      .filter((time) => time[0].moment.diff(now) <= 0 && moment.duration(now.diff(time[0].moment)).asHours() < 1);
    const currentEvents = lastEventTimes.length > 0 && lastEventTimes.slice(-1)[0];

    this.setState({ currentEvents, upcomingEvents });
  }

  render() {
    const { currentEvents, upcomingEvents } = this.state;
    const { children } = this.props;
    return React.Children.map(children, (child) => React.cloneElement(child, { currentEvents, upcomingEvents }));
  }
}
