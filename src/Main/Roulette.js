import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Slider from 'react-slick';
import { Icon, Button } from 'antd';
import RouletteItem from './RouletteItem';
import Coins from '../common/Coins'
import { greenColor, lightGreenColor } from '../variables'

class Roulette extends Component {
  play() {
    this.resultSlider.slickGoTo(100);
    this.coefficientSlider.slickGoTo(100);
  }
  render() {
    const { classes, onClickPlay, inProgress, resultItems, coeficientItems } = this.props;
    var settings = {
     infinite: true,
     speed: 8000,
     slidesToShow: 7,
     slidesToScroll: 1,
     arrows: false,
     draggable: false,
     centerMode: true,
   };

    return (
      <div className={classes.roulette}>
        <div className={classes.arrows}>
          <Icon type="down" />
        </div>
        <div className={`${classes.resultSlider} ${classes.slider}`}>
          <Slider {...settings} ref={(ref) => { this.resultSlider = ref }}>
            {
              resultItems.map(({ type }, index) => {
                return (
                  <RouletteItem key={index} type={type}>
                    {type === 'win' ? '+100' : '-150'} <Coins />
                  </RouletteItem>
                )
              })
            }
          </Slider>
        </div>
        <div className={`${classes.coefficientSlider} ${classes.slider}`}>
          <Slider {...{ ...settings, speed: settings.speed + 4000 }} ref={(ref) => { this.coefficientSlider = ref }}>
            {
              coeficientItems.map((item, index) => {
                return (
                  <RouletteItem key={index} coefficient={item/10}>
                    x{item / 10}
                  </RouletteItem>
                )
              })
            }
          </Slider>
        </div>
        <div className={classes.arrows}>
          <Icon type="up" />
        </div>
        <Button
          type="primary"
          size="large"
          disabled={inProgress}
          className={`play-button ${classes.playButton}`}
          onClick={() => {onClickPlay()}}
        >
          Play!
        </Button>
      </div>
    );
  }
}

const styles = {
  roulette: {
    'text-align': 'center',
    '& .slick-track': {
      'transition-timing-function': 'cubic-bezier(0, 0.9, 0.5, 1) !important',
    }
  },
  slider: {
    'box-shadow': '0px 0px 10px 0px rgba(0,0,0,0.75)'
  },
  coefficientSlider: {
    'margin-top': 20,
  },
  arrows: {
    'font-size': '50px',
    display: 'flex',
    'flex-direction': 'column'
  },
  playButton: {
    background: greenColor,
    'border-color': greenColor,
    '&:hover, &:focus, &:active': {
      background: lightGreenColor,
      'border-color': lightGreenColor
    }
  },
};

export default injectSheet(styles)(Roulette);

Roulette.defaultProps = {
  width: 'auto',
  inProgress: false
};

Roulette.propTypes = {
  classes: PropTypes.object.isRequired,
  resultItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  coeficientItems: PropTypes.arrayOf(PropTypes.number).isRequired,
  resultGoToIndex: PropTypes.number.isRequired,
  coeficientsGoToIndex: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClickPlay: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
};
