import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'

const Coins = ({ classes }) => {
    return (
      <i className={`fa fa-coins ${classes.coins}`} />
    )
}

const styles = {
  coins: {
    'color': 'gold',
  },
};

export default injectSheet(styles)(Coins);

Coins.propTypes = {
  classes: PropTypes.object.isRequired,
};
