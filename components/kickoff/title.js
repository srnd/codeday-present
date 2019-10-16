import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@srnd/topocons';
import QrCode from 'qrcode.react';
import { Slide } from '../screen';

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

  section, & > svg {
    display: inline-block;
  }
  
  & > svg {
    margin-right : 2vw;
    height: 19vh;
    width: auto;
    position: relative;
    bottom: -1vh;
  }

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

export default class TitleSlide extends React.Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
  }

  render() {
    const { config } = this.props;

    return (
      <Slide bg="#ff686b">
        <Title>CodeDay</Title>
        <WifiInfo>
          <QrCode
            value={`WIFI:S:${config.ssid};T:${config.pass && 'WPA'};P:${config.pass};;`}
            renderAs="svg"
            bgColor="transparent"
            fgColor="#fff"
          />
          <section>
            <h2><span><Icon.Wifi /> wifi</span></h2>
            <ul>
              <li><span>ssid</span> {config.ssid}</li>
              <li><span>pass</span> {config.pass || '(none)'}</li>
            </ul>
          </section>
        </WifiInfo>
      </Slide>
    );
  }
}
