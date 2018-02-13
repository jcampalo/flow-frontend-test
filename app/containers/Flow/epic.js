import { Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';

import execute from './execute';
import { actionTypes as at } from './constants';
import { selectContent, selectRules } from './selectors';
import { executeEnd } from './actions';

const onExecute = (action$, store) => {
  return action$
    .ofType(at.EXECUTE)
    .mergeMap(() => {
      const content = selectContent()(store.getState());
      const rules = selectRules()(store.getState());

      return Observable
        .fromPromise(
          execute({ content, rules })
        )
        .map(results => executeEnd({ results }));
    });
};

export {
  onExecute
};

export default combineEpics(onExecute);
