import React from 'react';
import PropTypes from 'prop-types';

export const makeCode = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64');
export const parseCode = (code) => JSON.parse(Buffer.from(code, 'base64').toString('ascii'));

export default class Settings extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      ssid: '',
      pass: '',
      timeFormat: 'h:mma',
      radio: true,
      hashtag: props.event.webname,
      additionalSlides: null,
    };
  }

  componentDidMount() {
    this.changeCode({});
  }

  changeCode(newState) {
    const { onChange } = this.props;

    onChange(makeCode({ ...this.state, ...newState }));
    this.setState(newState);
  }

  render() {
    const {
      ssid,
      pass,
      radio,
      hashtag,
      timeFormat,
    } = this.state;

    return (
      <div>
        <h2>Wifi Info</h2>
        <p>Enter the wifi information to be displayed on-screen.</p>
        <span>SSID:</span>
        <input type="text" value={ssid} onChange={(e) => this.changeCode({ ssid: e.target.value })} />
        <br />
        <span>Password:</span>
        <input type="text" value={pass} onChange={(e) => this.changeCode({ pass: e.target.value })} />

        <h2>Time Format</h2>
        <p>Choose whichever students are most likely to be familiar with (not your personal preference).</p>
        <select onChange={(e) => this.changeCode({ timeFormat: e.target.value })}>
          <option value="h:mma" selected={timeFormat === 'h:mma'}>12-hour</option>
          <option value="H:mm" selected={timeFormat === 'H:mm'}>24-hour</option>
        </select>

        <h2>CodeDay Radio</h2>
        <p>
          CodeDay Radio is a live internet radio station synchronized between all CodeDays. If you think you&apos;ll
          play CodeDay Radio, we&apos;ll display now-playing information.
        </p>
        <select onChange={(e) => this.changeCode({ radio: e.target.value === 'true' })}>
          <option selected={radio} value="true">Yes, I plan to play CodeDay Radio</option>
          <option selected={!radio} value="false">No, opt me out of CodeDay Radio</option>
        </select>

        <h2>Additional Slides</h2>
        <p>
          You can define additional slides to be inserted in the kickoff, after the schedule and before the local
          sponsors. Separate slides with a new line with four dashes (----). You can use Markdown.
        </p>
        <textarea
          style={{ width: '60rem', height: '10rem' }}
          onChange={(e) => this.changeCode({ additionalSlides: e.target.value })}
        >{
          this.state.additionalSlides
        }</textarea>

        <h2>Social</h2>
        <p>If you want to customize your event&apos;s hashtag, do so here.</p>
        <span>#</span>
        <input type="text" value={hashtag} onChange={(e) => this.changeCode({ hashtag: e.target.value })} />
      </div>
    );
  }
}
