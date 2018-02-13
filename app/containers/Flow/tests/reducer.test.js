import { fromJS } from 'immutable';

import reducer, { INITIAL_STATE } from '../reducer';
import {
  addRule,
  changeRule,
  changeContent,
  execute,
  executeEnd
} from '../actions';

describe('Flow Reducer', () => {
  it('should return the initial state', () => {
    const expectedResult = INITIAL_STATE;
    expect(reducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle addRule action correctly', () => {
    const expectedResult = INITIAL_STATE.set('rules', fromJS([{
      key: 0
    }, {
      key: 1
    }]));

    expect(reducer(INITIAL_STATE, addRule())).toEqual(expectedResult);
  });

  it('should handle changeRule action correctly', () => {
    const name = 'name';
    const value = 'value';
    const index = 0;
    const expectedResult = INITIAL_STATE
      .set('rules', fromJS([{
        key: 0,
        [name]: value
      }]));

    expect(reducer(INITIAL_STATE, changeRule({ name, value, index }))).toEqual(expectedResult);
  });

  it('should handle changeContent action correctly', () => {
    const value = 'value';
    const expectedResult = INITIAL_STATE
      .set('content', value);

    expect(reducer(INITIAL_STATE, changeContent({ value }))).toEqual(expectedResult);
  });

  it('should handle execute action correctly', () => {
    const expectedResult = INITIAL_STATE.set('loading', true);

    expect(reducer(INITIAL_STATE, execute())).toEqual(expectedResult);
  });

  it('should handle executeEnd action correctly', () => {
    const results = [];
    const expectedResult = INITIAL_STATE
      .set('results', fromJS(results));

    expect(reducer(INITIAL_STATE, executeEnd({ results }))).toEqual(expectedResult);
  });
});
