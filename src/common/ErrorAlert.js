import React from 'react';
import PropTypes from 'prop-types';
import { compose, branch, renderComponent } from 'recompose'
import { Alert } from 'antd';

const ErrorAlert = ({ text }) => (
  <Alert
    message="Error Text"
    description={text}
    type="error"
    closable
  />
)

export default compose(
  branch(
    ({ show }) => !show,
    renderComponent(() => null),
  ),
)(ErrorAlert);

ErrorAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  text: PropTypes.node.isRequired,
};
