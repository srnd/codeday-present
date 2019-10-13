import styled from 'styled-components';

const Text = styled.span`
  font-size: 3vh;

  ${({ block }) => block && `
    display: block;
  `}

  ${({ strike }) => strike && `
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
  `}
`;
export default Text;

export const Title = styled(Text).attrs({ as: 'h1' })`
  font-size: 6vh;
  display: block;
`;

export const Large = styled(Text)`
  font-size: 6vh;
  font-weight: 700;
`;
