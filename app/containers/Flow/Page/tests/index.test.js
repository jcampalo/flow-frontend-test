import React from 'react';
import { create } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import { FlowPage, mapDispatchToProps } from '../index';
import { addRule, changeRule } from '../../actions';

jest.mock('containers/Flow/ExecuteForm', () => 'ExecuteForm');

const initial = {
  results: [],
  rules: [],
  onInit: jest.fn()
};
const renderComponent = props => {
  const finalProps = { ...initial, ...props };

  return (
    <IntlProvider {...props}>
      <FlowPage {...finalProps} />
    </IntlProvider>
  );
};

describe('<FlowPage />', () => {
  it('should render component with no results and rules', () => {
    const tree = create(renderComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with rules', () => {
    const props = {
      rules: [{
        id: 'id',
        index: 0,
        title: 'title',
        body: 'body',
        rulePass: 'rulePass',
        ruleFail: 'ruleFail'
      }]
    };
    const tree = create(renderComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component with results', () => {
    const props = {
      results: [{
        id: 0,
        result: true,
        title: 'title'
      }, {
        id: 2,
        result: false,
        title: 'title'
      }, {
        id: 3,
        title: 'title'
      }]
    };
    const tree = create(renderComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('onAdd', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onAdd).toBeDefined();
      });

      it('should dispatch addRule when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);

        result.onAdd();

        expect(dispatch).toHaveBeenCalledWith(addRule());
      });
    });

    describe('onChangeRule', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);

        expect(result.onChangeRule).toBeDefined();
      });

      it('should dispatch changeRule when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const value = 'value';
        const name = 'name';
        const index = 'index';

        result.onChangeRule({ name, value, index });

        expect(dispatch).toHaveBeenCalledWith(changeRule({ name, value, index }));
      });
    });
  });
});
