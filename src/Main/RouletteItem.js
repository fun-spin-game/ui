import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, pure } from 'recompose';
import { greenColor, redColor } from '../variables'
import classNames from 'classnames'

const getLum = ({ coefficient }) => {
  return 100 - (20 + 60 * coefficient) + '%';
};

const RouletteItem = ({ classes, children }) => {
  return (<div className={classes.rouletteItem}>
    <div className={classNames(classes.rouletteContent, classes.rouletteContentMedia)}>
      <div>
        {children}
      </div>
    </div>
  </div>);
}

const styles = {
  rouletteItem: {
  },
  rouletteContentMedia: {
    '@media(max-width: 666px)': {
      'font-size': '17px !important',
      height: '80px !important',
    }
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
      height: 150,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      'text-align': 'center',
      color: 'white',
      background: background,
      'font-size': '35px',
      'border-left': '1px solid white',
      'border-right': '1px solid white',
    };
  },
};

export default compose(
  injectSheet(styles),
  pure,
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
