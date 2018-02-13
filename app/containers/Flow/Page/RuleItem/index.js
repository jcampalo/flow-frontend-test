import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextArea from 'components/TextArea';
import Input from 'components/Input';
import messages from '../../messages';
import Form from './Form';
import Wrapper from './Wrapper';
import InputWrapper from './InputWrapper';

class RuleItem extends PureComponent {
  handleChange = (value, name) => {
    const { index, onChange } = this.props;

    onChange({ name, value, index });
  }

  render() {
    const { id = '', title = '', body = '', rulePass = '', ruleFail = '' } = this.props;

    return (
      <Wrapper>
        <Form>
          <InputWrapper>
            <label htmlFor="title">
              <FormattedMessage {...messages.inputTitle}>
                {placeholder => (
                  <Input
                    name="title"
                    type="text"
                    placeholder={placeholder}
                    value={title}
                    onChange={this.handleChange}
                  />
                )}
              </FormattedMessage>
            </label>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="id">
              <FormattedMessage {...messages.inputId}>
                {placeholder => (
                  <Input
                    name="id"
                    type="number"
                    placeholder={placeholder}
                    value={id}
                    onChange={this.handleChange}
                  />
                )}
              </FormattedMessage>
            </label>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="body">
              <FormattedMessage {...messages.inputBody}>
                {placeholder => (
                  <TextArea
                    rows={6}
                    name="body"
                    type="text"
                    placeholder={placeholder}
                    value={body}
                    onChange={this.handleChange}
                  />
                )}
              </FormattedMessage>
            </label>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="rulePass">
              <FormattedMessage {...messages.inputRulePass}>
                {placeholder => (
                  <Input
                    name="rulePass"
                    type="number"
                    placeholder={placeholder}
                    value={rulePass}
                    onChange={this.handleChange}
                  />
                )}
              </FormattedMessage>
            </label>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="ruleFail">
              <FormattedMessage {...messages.inputRuleFail}>
                {placeholder => (
                  <Input
                    name="ruleFail"
                    type="number"
                    placeholder={placeholder}
                    value={ruleFail}
                    onChange={this.handleChange}
                  />
                )}
              </FormattedMessage>
            </label>
          </InputWrapper>
        </Form>
      </Wrapper>
    );
  }
}

RuleItem.propTypes = {
  id: PropTypes.string,
  index: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  rulePass: PropTypes.string,
  ruleFail: PropTypes.string,
  onChange: PropTypes.func
};

export default RuleItem;
