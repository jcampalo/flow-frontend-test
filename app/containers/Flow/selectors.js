import { createSelector } from 'reselect';

import { key } from './constants';

const selectFlowStore = state => state.get(key);

const selectLoading = () => createSelector(
  selectFlowStore,
  flowStore => flowStore.get('loading')
);

const selectRules = () => createSelector(
  selectFlowStore,
  flowStore => flowStore.get('rules').toJS()
);

const selectResults = () => createSelector(
  selectFlowStore,
  flowStore => flowStore.get('results').toJS()
);

const selectContent = () => createSelector(
  selectFlowStore,
  flowStore => flowStore.get('content')
);

export {
  selectFlowStore,
  selectLoading,
  selectRules,
  selectResults,
  selectContent
};
