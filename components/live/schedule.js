import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import memoize from 'memoize-one';
import moment from 'moment-timezone';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { BgSectionText } from '../screen/text';

export const EventBox = styled.div`
  margin-bottom: 1vh;
  overflow: hidden;

  &.schedule-event-enter, &.schedule-event-leave.schedule-event-leave-active {
    opacity: 0;
    max-height: 0;
  }

  &.schedule-event-enter.schedule-event-enter-active, &.schedule-event-leave {
    opacity: 1;
    transition: all 0.5s ease-in;
    max-height: 4em;
  }
`;
export const EventTitle = styled.span``;
export const EventTime = styled.span``;
export const Placeholder = styled.span``;
const Section = styled.div`
  margin-bottom: 4vh;

  ${EventTitle}, ${EventTime} {
    display: block;
    white-space:nowrap
  }

  ${({ type }) => type === 'upcoming' && css`
    ${EventTitle} {
      font-size: 3vh;
    }

    ${EventTime} {
      font-size: 1.5vh;
    }
  `}

  ${({ type }) => type === 'current' && css`
    ${EventTitle} {
      font-size: 6vh;
      margin-top: -1vh;
    }

    ${EventTime} {
      display: none;
    }
  `}
`;

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
    config: PropTypes.object.isRequired,
  }

  state = {
    currentEvents: [],
    upcomingEvents: [],
  }

  componentDidMount() {
    this.updateIntervalId = setInterval(() => { this.updateEvents(); this.forceUpdate(); }, 1000);
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

  drawSchedule(toDraw) {
    const { config } = this.props;
    let content = [];

    if (toDraw) {
      content = toDraw.map((event) => (
        <EventBox key={`${event.title} ${event.moment.format()}`}>
          <EventTitle>{event.title}</EventTitle>
          <EventTime>{event.moment.format(config.timeFormat)} ({event.moment.fromNow()})</EventTime>
        </EventBox>
      ));
    } else {
      content = [(
        <EventBox key="placeholder">
          <Placeholder>
            <EventTitle>Nothing</EventTitle>
            <EventTime>Now</EventTime>
          </Placeholder>
        </EventBox>
      )];
    }

    return (
      <ReactCSSTransitionGroup
        transitionName="schedule-event"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {content}
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    const { upcomingEvents, currentEvents } = this.state;

    return (
      <div>
        <Section type="current">
          <BgSectionText>Happening Now</BgSectionText>
          {this.drawSchedule(currentEvents)}
        </Section>
        <Section type="upcoming">
          <BgSectionText>Later</BgSectionText>
          {this.drawSchedule(upcomingEvents)}
        </Section>
      </div>
    );
  }
}
