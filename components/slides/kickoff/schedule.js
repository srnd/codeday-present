import React from 'react'
import Base, { Title } from '../base'
import styled, {keyframes} from 'styled-components'

const RainbowKeyframes = keyframes`
  0%{background-position:0% 90%}
  50%{background-position:100% 11%}
  100%{background-position:0% 90%}
`

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
`

const Day = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
  padding: 5vh 5vh;
  box-sizing: border-box;
  vertical-align: top;

  ${ScheduleEntry} {
    background-color: #c8c7ff;
  }
`

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
`

const StrikeTitle = styled.span`
  font-size: 6vh;
  display: inline-block;
  padding: 0 1%;
  &:after {
    content: "";
    display: block;
    height: 0.5vh;
    background-color: #ff3b50;
    position: relative;
    top: -3.2vh;
    left: -2.5%;
    width: 105%;
  }
`

export default ({ event }) => {

  const fullSchedule = Object.values(event.schedule).reduce((a, b) => a.concat(b), []).filter(evt => evt.time > 0);
  const workSchedule = fullSchedule.filter(evt => evt.time <= 6.5);
  const funSchedule = fullSchedule.filter(evt => evt.time > 6.5).filter(evt => evt.time < 17);


  const drawSched = (sched) => sched.map((evt) => <ScheduleEntry key={`${evt.hour}-${evt.title}`}>
        <span>{evt.hour}</span>
        <p>{evt.title}</p>
      </ScheduleEntry>);

  return <Base padding="0">
    <Day>
      <Title>Work Time (<StrikeTitle>gaming</StrikeTitle>)</Title>
      {drawSched(workSchedule)}
    </Day><Night>
      <Title>&ldquo;Work&rdquo; Time</Title>
      {drawSched(funSchedule)}
    </Night>
  </Base>
};