import React from 'react';
import { create } from 'react-test-renderer';

import Button from '../index';

const initial = {};
const renderComponent = props => {
  const finalProps = { ...initial, ...props };

  return (
    <Button {...finalProps}>
      Test
    </Button>
  );
};

describe('<Button />', () => {
  it('should render component', () => {
    const tree = create(renderComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component when is loading', () => {
    const props = {
      loading: true
    };
    const tree = create(renderComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
