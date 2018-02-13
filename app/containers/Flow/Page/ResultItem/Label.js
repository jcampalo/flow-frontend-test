import styled from 'styled-components';

export default styled.label`
  font-size: 1em;
  color: ${({ error }) => error ? '#E91E63' : '#07DCA5'};
`;
