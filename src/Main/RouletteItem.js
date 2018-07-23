import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose } from 'recompose';
import { greenColor, redColor } from '../variables'

const getLum = ({ coefficient }) => {
  return 100 - (20 + 60 * coefficient) + '%';
};

const RouletteItem = ({ classes, children }) => (
  <div className={classes.rouletteItem}>
    <div className={classes.rouletteContent}>
      {children}
    </div>
  </div>
);

const styles = {
  rouletteItem: {
  },
  rouletteContent: ({ type, coefficient }) => {
    let background;
    switch (type) {
      case 'win':
        background = greenColor
        break;
      case 'lose':
        background = redColor
        break;
      case 'default':
      default:
        background = `hsl(209, 85%, ${getLum({ coefficient })})`
    }
    return {
      'text-align': 'center',
      color: 'white',
      padding: '25px 0',
      background: background,
      'font-size': '35px',
      'border-left': '1px solid white',
      'border-right': '1px solid white'
    };
  },
};

export default compose(
  injectSheet(styles)
)(RouletteItem);

RouletteItem.defaultProps = {
  type: 'default',
  coefficient: null,
};

RouletteItem.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['win', 'lose', 'default']),
  coefficient: PropTypes.number,
};
