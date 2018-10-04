import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { pure, compose} from 'recompose';

const Coins = ({ classes }) => {
  return (
    <i className={`fa fa-coins ${classes.coins}`} />
  );
};

const styles = {
  coins: {
    'color': 'gold',
  },
};

export default compose(injectSheet(styles), pure)(Coins);

Coins.propTypes = {
  classes: PropTypes.object.isRequired,
};
