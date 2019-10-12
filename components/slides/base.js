import React from 'react'
import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 6vh;
`

export const LargeText = styled.p`
  font-size: 6vh;
  font-weight: 700;
`

export default styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({bg}) => bg || '#ffffff'};
  color: ${({fg}) => fg || '#000000'};
  font-family: ${({font}) => font || `'Gosha Sans', Helvetica, sans-serif`};
  padding: ${({padding}) => padding || '5vh 5vw'};
  overflow: hidden;
`;