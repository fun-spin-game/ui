import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, pure } from 'recompose';

const Title = ({
  children,
  classes
}) => (
  <h1 className={classes.title}>{children}</h1>
);

const styles = {
  title: {
    fontFamily: 'lobster',
    'text-align': 'center',
    marginBottom: 30,
    fontSize: 35,
    '@media(max-width: 666px)': {
      fontSize: 28,
    }
  },
};

export default compose(
  injectSheet(styles),
  pure,
)(Title);

Title.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};
