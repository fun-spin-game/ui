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
    fontSize: 17,
    '@media(max-width: 666px)': {
      fontSize: 15,
    }
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
