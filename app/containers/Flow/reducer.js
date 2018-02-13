import { fromJS } from 'immutable';

import { actionTypes as at } from './constants';

export const INITIAL_STATE = fromJS({
  loading: false,
  content: '',
  rules: [{
    key: 0
  }],
  results: []
});

export default (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case at.ADD_RULE: {
      const rules = state.get('rules');

      return state
        .set('rules', state.get('rules').push(fromJS({ key: rules.last().get('key') + 1 })));
    }
    case at.CHANGE_RULE: {
      const { name, value, index } = payload;

      return state
        .setIn(['rules', index, name], value);
    }
    case at.CHANGE_CONTENT: {
      const { value } = payload;

      return state
        .set('content', value);
    }
    case at.EXECUTE: {
      return state
        .set('loading', !INITIAL_STATE.get('loading'))
        .set('results', INITIAL_STATE.get('results'));
    }
    case at.EXECUTE_END: {
      const { results } = payload;

      return state
        .set('loading', INITIAL_STATE.get('loading'))
        .set('results', fromJS(results));
    }
    default:
      return state;
  }
};
