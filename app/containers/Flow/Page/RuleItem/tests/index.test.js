import React from 'react';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';

import RuleItem from '../index';

const initial = {};
const renderComponent = props => {
  const finalProps = { ...initial, ...props };

  return (
    <IntlProvider {...props}>
      <RuleItem {...finalProps} />
    </IntlProvider>
  );
};

describe('<RuleItem />', () => {
  it('should render component ', () => {
    const tree = create(renderComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call onChange when input changes', () => {
    const onChange = jest.fn();
    const name = 'name';
    const value = 'value';
    const index = 'index';
    const props = {
      index,
      onChange
    };
    const component = shallow(<RuleItem {...props} />);
    const instance = component.instance();

    instance.handleChange(value, name);

    expect(onChange).toHaveBeenCalledWith({ index, name, value });
  });
});
