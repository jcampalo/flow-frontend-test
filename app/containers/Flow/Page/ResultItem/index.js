import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from '../../messages';
import Label from './Label';
import Wrapper from './Wrapper';

const ResultItem = props => {
  const { result, title } = props;

  if (typeof result === 'boolean') {
    return (
      <Wrapper>
        <FormattedMessage {...messages[result ? 'pass' : 'fail']} values={{ title }}>{
          text => (
            <Label error={!result}>{text}</Label>
          )
        }
        </FormattedMessage>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Label>{title}</Label>
    </Wrapper>
  );
};

ResultItem.propTypes = {
  result: PropTypes.bool,
  title: PropTypes.string
};

export default ResultItem;
