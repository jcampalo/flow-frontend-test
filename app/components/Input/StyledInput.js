import styled from 'styled-components';

import HOC from './HOC';
import inputStyles from './inputStyles';

const Input = styled.input`
  ${inputStyles}
  position: relative;
  display: block;
  padding: 0.5em;
  margin-left: 0.5em;
  font-size: 1em;
  width: 100%;
  border: 1px solid;
  transition: border 0.3s;

  :active,
  :focus {
    border: 1px solid #00DCA4;
  }

  :-webkit-autofill {
    background-color: transparent;
    background-image: none;
    color: #6A7989;
  }
`;

export default HOC(Input);
