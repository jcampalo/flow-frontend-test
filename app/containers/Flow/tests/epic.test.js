import { ActionsObservable } from 'redux-observable';
import { fromJS } from 'immutable';

import { onExecute } from '../epic';
import { actionTypes as at, key } from '../constants';
import execute from '../execute';

jest.mock('../execute', () => jest.fn());

const store = {
  getState: jest.fn()
};
const state = fromJS({
  [key]: {
    content: 'content',
    rules: []
  }
});

store.getState.mockReturnValue(state);

describe('Flow Epic', () => {
  describe('onExecute', () => {
    it('should dispatch EXECUTE_END', () => {
      const results = 'results';
      const action$ = ActionsObservable.of({ type: at.EXECUTE });

      execute.mockReturnValue(Promise.resolve(results));

      return new Promise((resolve, reject) => {
        onExecute(action$, store)
          .toArray()
          .subscribe(actions => {
            try {
              expect(actions).toEqual([
                { type: at.EXECUTE_END, payload: { results } }
              ]);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
      });
    });
  });

  /*
  {
    key: 0,
    title: 'Is defined',
    id: 1,
    body: 'function(obj) { return !!obj }',
    ruleFail: 2,
    rulePass: 3
  }, {
    key: 1,
    title: 'Is with name',
    id: 2,
    body: 'function(obj) { return !!obj.name }',
    ruleFail: 4,
    rulePass: 4
  }, {
    key: 2,
    title: 'Is with description',
    id: 3,
    body: 'function(obj) { return !!obj.description }',
    ruleFail: 4,
    rulePass: 4
  }, {
    key: 3,
    title: 'It has keys',
    id: 4,
    body: 'function(obj) { return Object.keys(keys).length }'
  }*/
});
