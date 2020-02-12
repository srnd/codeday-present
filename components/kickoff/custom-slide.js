import React from 'react';
import styled from 'styled-components';
import { Slide } from '../screen';

const CustomContainer = styled.div`
  h1, h2, h3, h4, h5, h6, code, pre, p, li, span {
    font-size: 6vh;
  }
`;

export default ({ content }) => (
  <Slide bg="#fff" fg="#000">
    <CustomContainer dangerouslySetInnerHTML={{__html: content}} />
  </Slide>
);
