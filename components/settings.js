import React from 'react';
import PropTypes from 'prop-types';

export const makeCode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');
export const parseCode = (code) => JSON.parse(Buffer.from(code, 'base64').toString('ascii'));

export default class Settings extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  state = {
    ssid: '',
    pass: '',
  }

  changeCode(newState) {
    const { onChange } = this.props;

    onChange(makeCode({ ...this.state, ...newState }));
    this.setState(newState);
  }

  render() {
    const { ssid, pass } = this.state;

    return (
      <div>
        <h2>Wifi Info</h2>
        <span>SSID:</span>
        <input type="text" value={ssid} onChange={(e) => this.changeCode({ ssid: e.target.value })} />
        <br />
        <span>Password:</span>
        <input type="text" value={pass} onChange={(e) => this.changeCode({ pass: e.target.value })} />
      </div>
    );
  }
}
