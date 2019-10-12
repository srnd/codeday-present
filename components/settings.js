import React from 'react'
import Link from 'next/link'

export const makeCode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');
export const parseCode = (code) => JSON.parse(Buffer.from(code, 'base64').toString('ascii'));

export class SettingsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssid: '',
      pass: ''
    }
  }

  render() {
    return (
      <div>
        <h2>Wifi Info</h2>
        <input type="text" placeholder="SSID" value={this.state.ssid} onChange={(e) => this.changeCode({ssid: e.target.value})} /><br />
        <input type="text" placeholder="Password" value={this.state.pass} onChange={(e) => this.changeCode({pass: e.target.value})} />
      </div>
    );
  }

  changeCode(newState) {
    this.props.onChange(makeCode({...this.state, ...newState}));
    this.setState(newState);
  }
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '', 
    }
  }

  render() {
    const {event} = this.props;

    return (
      <>
        <SettingsBlock onChange={(code) => this.setState({code: code})} />
        {this.state.code && <Link><a href={`/e/${event.id}/${this.state.code}`}>Launch</a></Link>}
      </>
    );
  }
}