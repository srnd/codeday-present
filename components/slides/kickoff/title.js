import React from 'react'
import Base from '../base'
import styled from 'styled-components'
import Icon from '@srnd/topocons'

const Title = styled.div`
  text-align: center;
  font-size: 20vh;
  margin-top: 20vh;
  color: #fff;
`;

const WifiInfo = styled.div`
  position: absolute;
  left: 5vw;
  bottom: 5vh;
  color: #fff;

  h2 {
   font-size: 5vh;
   margin-bottom: 0;
   span {
     border-bottom: 0.4vh solid #fff;
   }
   svg {
     position: relative;
     top: 0.5vh;
   }
  }

  ul {
    padding: 0;
    li {
      list-style-type: none;
      font-size: 5vh;
      font-family: 'Fira Mono', 'Fira Code', 'Inconsolata', 'Courier New', monospace;


      span {
        display: inline-block;
        width: 15vh;
        font-family: 'Gosha Sans', Helvetica, sans-serif;
      }
    }
  }
`;

export default ({ eventInfo, config }) => {
  return <Base bg='#ff686b'>
    <Title>CodeDay</Title>
    <WifiInfo>
      <h2><span><Icon.Wifi /> wifi</span></h2>
      <ul>
        <li><span>ssid</span> {config.ssid}</li>
        <li><span>pass</span> {config.pass}</li>
      </ul>
    </WifiInfo>
  </Base>
}