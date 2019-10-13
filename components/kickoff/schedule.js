/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import HalfHalf from '../screen/slide/half-half';
import { Title, Large } from '../screen/text';

const RainbowKeyframes = keyframes`
  0%{background-position:0% 90%}
  50%{background-position:100% 11%}
  100%{background-position:0% 90%}
`;

const ScheduleEntry = styled.div`
  box-sizing: border-box;
  padding: 1vh 1vw;
  margin-bottom: 1vh;
  span {
    color: #000;
    display: block;
    font-size: 2vh;
  }
  p {
    color: #000;
    font-size: 3vh;
    margin: 0;
  }
`;

const Day = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 5vh 5vh;
  box-sizing: border-box;
  vertical-align: top;

  ${ScheduleEntry} {
    background-color: #c8c7ff;
  }
`;

const Night = styled(Day)`
  animation: ${RainbowKeyframes} 40s ease infinite;
  background: linear-gradient(270deg, #55b71e, #26a4c1, #8c309b, #d56b14);
  background-size: 800% 800%;

  ${Title} {
    color: #fff;
  }

  ${ScheduleEntry} {
    background-color: #fff;
    span {
      color: #8e8e8e;
    }
  }
`;

export default class Schedule extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
  }

  render() {
    const { event } = this.props;
    const fullSchedule = Object.values(event.schedule).reduce((a, b) => a.concat(b), []).filter((evt) => evt.time > 0);
    const workSchedule = fullSchedule.filter((evt) => evt.time <= 6.5);
    const funSchedule = fullSchedule.filter((evt) => evt.time > 6.5).filter((evt) => evt.time < 17);

    const drawSchedule = (schedule) => schedule.map((evt) => (
      <ScheduleEntry key={`${evt.hour}-${evt.title}`}>
        <span>{evt.hour}</span>
        <p>{evt.title}</p>
      </ScheduleEntry>
    ));

    return (
      <HalfHalf padding="0">
        <Day>
          <Title>Work Time (<Large strike>gaming</Large>)</Title>
          {drawSchedule(workSchedule)}
        </Day>
        <Night>
          <Title>&ldquo;Work&rdquo; Time</Title>
          {drawSchedule(funSchedule)}
        </Night>
      </HalfHalf>
    );
  }
}
