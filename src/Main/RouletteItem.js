import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { greenColor, redColor } from '../variables'

class RouletteItem extends Component {
  static getLum({ coefficient }) {
    return 100 - (20 + 60 * coefficient) + '%';
  }
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.rouletteItem}>
        <div className={classes.rouletteContent}>
          {children}
        </div>
      </div>
    );
  }
}

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
        background = `hsl(209, 85%, ${RouletteItem.getLum({ coefficient })})`
    }
    return {
      'text-align': 'center',
      color: 'white',
      padding: '25px 0',
      background: background,
      'font-size': '35px',
      'margin-left': '1px'
    };
  },
};

export default injectSheet(styles)(RouletteItem);

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
