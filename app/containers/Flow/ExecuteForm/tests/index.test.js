import React from 'react';
import { create } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import { FlowExecuteForm, mapDispatchToProps } from '../index';
import { changeContent, execute } from '../../actions';

const initial = {};
const renderComponent = props => {
  const finalProps = { ...initial, ...props };

  return (
    <IntlProvider {...props}>
      <FlowExecuteForm {...finalProps} />
    </IntlProvider>
  );
};

describe('<FlowExecuteForm />', () => {
  it('should render component', () => {
    const tree = create(renderComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('onChange', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChange).toBeDefined();
      });

      it('should dispatch changeContent when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const value = 'value';

        result.onChange(value);

        expect(dispatch).toHaveBeenCalledWith(changeContent({ value }));
      });
    });

    describe('onSubmit', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);

        expect(result.onSubmit).toBeDefined();
      });

      it('should dispatch execute when called', () => {
        const dispatch = jest.fn();
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const evt = { preventDefault };

        result.onSubmit(evt);

        expect(preventDefault).toHaveBeenCalledWith();
        expect(dispatch).toHaveBeenCalledWith(execute());
      });
    });
  });
});
