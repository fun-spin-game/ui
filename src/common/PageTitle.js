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
    'text-align': 'center',
    marginBottom: 30,
    '@media(max-width: 600px)': {
      fontSize: '20px',
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
