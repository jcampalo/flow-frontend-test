import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { isInvalid } from 'utils/form';
import TextArea from 'components/TextArea';
import SubmitButton from './SubmitButton';
import Form from './Form';
import messages from '../messages';
import { changeContent, execute } from '../actions';
import { selectLoading, selectContent } from '../selectors';

export class FlowExecuteForm extends PureComponent {
  render() {
    const { content, loading, onSubmit, onChange } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        <label htmlFor="content">
          <FormattedMessage {...messages.inputContent}>
            {placeholder => (
              <TextArea
                rows={6}
                name="content"
                type="text"
                placeholder={placeholder}
                value={content}
                onChange={onChange}
              />
            )}
          </FormattedMessage>
        </label>
        <SubmitButton disabled={loading || isInvalid(this.props, ['content'])}>
          <FormattedMessage {...messages.run} />
        </SubmitButton>
      </Form>
    );
  }
}

FlowExecuteForm.propTypes = {
  loading: PropTypes.bool,
  content: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

export const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeContent({ value })),
  onSubmit: e => {
    e.preventDefault();

    dispatch(execute());
  }
});

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  content: selectContent()
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowExecuteForm);
