import { actionTypes as at } from '../constants';

import {
  addRule,
  changeRule,
  changeContent,
  execute,
  executeEnd
} from '../actions';

describe('Flow Actions', () => {
  describe('addRule', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: at.ADD_RULE
      };

      expect(addRule()).toEqual(expectedResult);
    });
  });

  describe('changeRule', () => {
    it('should return the correct type', () => {
      const name = 'name';
      const value = 'value';
      const index = 'index';
      const expectedResult = {
        type: at.CHANGE_RULE,
        payload: { name, value, index }
      };

      expect(changeRule({ name, value, index })).toEqual(expectedResult);
    });
  });

  describe('changeContent', () => {
    it('should return the correct type', () => {
      const value = 'value';
      const expectedResult = {
        type: at.CHANGE_CONTENT,
        payload: { value }
      };

      expect(changeContent({ value })).toEqual(expectedResult);
    });
  });

  describe('execute', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: at.EXECUTE
      };

      expect(execute()).toEqual(expectedResult);
    });
  });

  describe('executeEnd', () => {
    it('should return the correct type', () => {
      const results = 'results';
      const expectedResult = {
        type: at.EXECUTE_END,
        payload: { results }
      };

      expect(executeEnd({ results })).toEqual(expectedResult);
    });
  });
});
