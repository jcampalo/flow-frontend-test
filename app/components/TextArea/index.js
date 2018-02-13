import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import StyledTextArea from './StyledTextArea';
import Wrapper from './Wrapper';
import Label from './Label';

class TextArea extends PureComponent {
  state = {
    isFocused: false,
    isFilled: !!this.props.value
  };

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      if (value && !this.state.isFilled) {
        this.setState({
          isFilled: true
        });
      }

      if (!value && this.state.isFilled) {
        this.setState({
          isFilled: false
        });
      }
    }
  }

  handleChange = (value, name) => {
    const { onChange } = this.props;

    this.setState({
      isFilled: value.length
    });

    if (onChange) onChange(value, name);
  }

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
  }

  handleBlur = () => {
    this.setState({
      isFocused: false
    });
  }

  render() {
    const { isFocused, isFilled } = this.state;
    const { value, name, rows, type, placeholder } = this.props;
    const focused = isFocused || isFilled;

    return (
      <Wrapper>
        <Label focused={focused}>{placeholder}</Label>
        <StyledTextArea
          name={name}
          value={value}
          type={type}
          rows={rows}
          autoComplete="off"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
      </Wrapper>
    );
  }
}

TextArea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func
};

export default TextArea;
