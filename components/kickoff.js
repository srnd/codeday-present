import React from 'react'
import Deck from './slides/deck'
import KickoffSlides from './slides/kickoff'
import Head from 'next/head'

export default (props) => {
    const slides = KickoffSlides.map(e => React.createElement(e, props, []));
    return <>
      <Head>
        <link rel="stylesheet" href="https://f1.srnd.org/fonts/gosha-sans/all.css" />
      </Head>
      <Deck slides={slides} />
    </>
}