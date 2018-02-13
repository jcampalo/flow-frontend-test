import { actionTypes as at } from './constants';

export const addRule = () => ({
  type: at.ADD_RULE
});

export const changeRule = ({ name, value, index }) => ({
  type: at.CHANGE_RULE,
  payload: { name, value, index }
});

export const changeContent = ({ value }) => ({
  type: at.CHANGE_CONTENT,
  payload: { value }
});

export const execute = () => ({
  type: at.EXECUTE
});

export const executeEnd = ({ results }) => ({
  type: at.EXECUTE_END,
  payload: { results }
});
