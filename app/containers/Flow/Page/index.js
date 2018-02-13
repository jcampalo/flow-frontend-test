import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectEpic from 'utils/injectEpic';
import Button from 'components/Button';
import ExecuteForm from 'containers/Flow/ExecuteForm';
import messages from '../messages';
import { key } from '../constants';
import { addRule, changeRule } from '../actions';
import { selectRules, selectResults } from '../selectors';
import reducer from '../reducer';
import epic from '../epic';
import ResultItem from './ResultItem';
import RuleItem from './RuleItem';
import Wrapper from './Wrapper';
import WrapperTasks from './WrapperTasks';
import WrapperExecute from './WrapperExecute';

export class FlowPage extends PureComponent {
  renderResults() {
    const { results } = this.props;

    return results.map(result => (
      <ResultItem key={result.id} {...result} />
    ));
  }

  renderRules() {
    const { rules, onChangeRule } = this.props;

    return rules.map(data => {
      return (
        <RuleItem
          key={data.key}
          {...data}
          index={data.key}
          onChange={onChangeRule}
        />
      );
    });
  }

  render() {
    const { onAdd } = this.props;

    return (
      <Wrapper>
        <FormattedMessage {...messages.header}>{
          header => (
            <Helmet>
              <title>{header}</title>
              <meta name="description" content="Flow Page" />
            </Helmet>
          )
        }
        </FormattedMessage>
        <WrapperTasks>
          {this.renderRules()}
          <Button type="button" onClick={onAdd}>
            Add
          </Button>
        </WrapperTasks>
        <WrapperExecute>
          <ExecuteForm />
          <FormattedMessage {...messages.results} />
          {this.renderResults()}
        </WrapperExecute>
      </Wrapper>
    );
  }
}

FlowPage.propTypes = {
  results: PropTypes.array,
  rules: PropTypes.array,
  onAdd: PropTypes.func,
  onChangeRule: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch(addRule()),
  onChangeRule: ({ name, value, index }) => dispatch(changeRule({ name, value, index }))
});

const mapStateToProps = createStructuredSelector({
  rules: selectRules(),
  results: selectResults()
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key, reducer });
const withEpic = injectEpic({ key, epic });

export default compose(
  withReducer,
  withConnect,
  withEpic
)(FlowPage);
