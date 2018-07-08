import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Circle } from 'rc-progress';

class SliderItem extends Component {
  getColor(value) {
    const hue = ((value) * 120).toString(10);
    return ["hsl(",hue,",100%,50%)"].join("");
  }
  render() {
    const { classes, percentage, prize } = this.props;

    return (
      <div className={`${classes.sliderItem}`}>
        <div className={`slider-content ${classes.sliderContent}`}>
          <span className={classes.percentage}>{percentage}%</span>
          <div>
            <Circle
              percent={percentage}
              gapDegree={70}
              gapPosition="bottom"
              strokeWidth="7"
              strokeLinecap="round"
              strokeColor={this.getColor(percentage / 100)}
              trailWidth="7"
              trailColor="#f5f5f5"
              style={{
                width: 120,
                height: 120
              }}
            />
          </div>
          <span className={classes.prize}>{prize}$</span>
        </div>
      </div>
    )
  }
}

const styles = {
  sliderItem: {
    'text-align': 'center',
    'padding-top': '20px',
  },
  sliderContent: {
    transition: 'all 300ms ease',
    'transform-origin': '50% 50%',
    cursor: 'pointer',
    display: 'flex',
    'flex-direction': 'column',
  },
  percentage: {
    'margin-bottom': '5px',
  },
  prize: {
    'position': 'relative',
    'top': '-40px',
    'margin-top': '-45px',
    'font-size': '25px'
  },
};

export default injectSheet(styles)(SliderItem);

SliderItem.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  prize: PropTypes.number.isRequired,
  bid: PropTypes.number.isRequired,
};
