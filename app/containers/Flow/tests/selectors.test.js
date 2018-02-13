import { fromJS } from 'immutable';

import { key } from '../constants';
import {
  selectFlowStore,
  selectLoading,
  selectRules,
  selectResults,
  selectContent
} from '../selectors';

describe('Flow Selectors', () => {
  describe('selectFlowStore', () => {
    it('should select the key state', () => {
      const state = fromJS({
        data: {},
      });
      const mockedState = fromJS({
        [key]: state
      });

      expect(selectFlowStore(mockedState)).toEqual(state);
    });
  });

  describe('selectLoading', () => {
    const selector = selectLoading();

    it('should select the loading', () => {
      const loading = 'loading';
      const mockedState = fromJS({
        [key]: {
          loading
        }
      });

      expect(selector(mockedState)).toEqual(loading);
    });
  });

  describe('selectRules', () => {
    const selector = selectRules();

    it('should select the rules', () => {
      const rules = {
        id: 'id'
      };
      const mockedState = fromJS({
        [key]: {
          rules
        }
      });

      expect(selector(mockedState)).toEqual(rules);
    });
  });

  describe('selectResults', () => {
    const selector = selectResults();

    it('should select the rules', () => {
      const results = {
        id: 'id'
      };
      const mockedState = fromJS({
        [key]: {
          results
        }
      });

      expect(selector(mockedState)).toEqual(results);
    });
  });

  describe('selectContent', () => {
    const selector = selectContent();

    it('should select the content', () => {
      const content = 'content';
      const mockedState = fromJS({
        [key]: {
          content
        }
      });

      expect(selector(mockedState)).toEqual(content);
    });
  });
});
