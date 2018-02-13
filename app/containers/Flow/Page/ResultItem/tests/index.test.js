import React from 'react';
import { create } from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import ResultItem from '../index';

const initial = {};
const renderComponent = props => {
  const finalProps = { ...initial, ...props };

  return (
    <IntlProvider {...props}>
      <ResultItem {...finalProps} />
    </IntlProvider>
  );
};

describe('<ResultItem />', () => {
  it('should render component ', () => {
    const tree = create(renderComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component when result pass', () => {
    const props = {
      result: true,
      title: 'title'
    };
    const tree = create(renderComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component when result fail', () => {
    const props = {
      result: false,
      title: 'title'
    };
    const tree = create(renderComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render component when ends', () => {
    const props = {
      title: 'title'
    };
    const tree = create(renderComponent(props)).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
