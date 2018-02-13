import styled from 'styled-components';

export default styled.label`
  color: ${({ focused }) => (focused ? '#00DCA4' : '#6A7989')};
  font-weight: bold;
  font-size: 1em;
  user-select: none;
  text-align: left;
  pointer-events: none;
  -webkit-touch-callout: none;
  transition: color 0.3s;
`;
