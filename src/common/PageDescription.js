import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, pure } from 'recompose';

const PageDescription = ({
  children,
  classes
}) => (
  <p className={classes.pageDescription}>{children}</p>
);

const styles = {
  pageDescription: {
    'text-align': 'center',
  },
};

export default compose(
  injectSheet(styles),
  pure,
)(PageDescription);

PageDescription.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};
