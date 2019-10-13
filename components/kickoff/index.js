import React from 'react';
import Head from 'next/head';
import { Deck } from '../screen';

import Title from './title';
import Video from './video';
import CreateCode from './create-code';
import Conduct from './conduct';
import Schedule from './schedule';
import Sponsors from './sponsors';
import Pitches from './pitches';
import Judging from './judging';

const KickoffSlides = [Title, Video, CreateCode, Judging, Conduct, Schedule, Sponsors, Pitches];

export default (props) => {
  const slides = KickoffSlides.map((e) => React.createElement(e, props, []));
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://f1.srnd.org/fonts/gosha-sans/all.css" />
      </Head>
      <Deck slides={slides} />
    </div>
  );
};
