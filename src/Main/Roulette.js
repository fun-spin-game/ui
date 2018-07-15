import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Slider from 'react-slick';
import _ from 'lodash';
import { Icon, Button } from 'antd';
import RouletteItem from './RouletteItem';
import Coins from '../common/Coins'
import { greenColor, redColor, lightGreenColor } from '../variables'

const BASE_SLIDER_SPEED = 8000;
const SLIDERS_SPEED_DIFFERENCE = 4000;
const REWARD_ANIMATION_DURATION = 3000;
const SETTINGS = {
 infinite: true,
 slidesToShow: 7,
 slidesToScroll: 1,
 arrows: false,
 draggable: false,
 centerMode: true,
 speed: BASE_SLIDER_SPEED,
 initialSlide: 0,
};
class Roulette extends Component {
  constructor({ chancePercentage }) {
    super();
    const coeficients = Array.apply(null, Array(11)).map(function (x, i) { return i / 10; });
    this.state = {
      showReward: false,
      resultItems: Array.apply(null, Array(110)).map(() => Math.random() >= chancePercentage / 100),
      coeficientItems: [].concat(
        coeficients,
        coeficients,
        coeficients,
        coeficients,
        coeficients,
        coeficients,
        coeficients,
        coeficients,
        coeficients,
        coeficients,
      ).sort(() => {
        return Math.random() > 0.5 ? 1 : -1;
      }),
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.inProgress === false && this.props.inProgress === true) {
      this.play();
    }
  }
  getNextIndex(value, items) {
    const minIndex = 60;
    const sliceIndex = _.random(minIndex, items.length - 1);
    const randomIndex = items.findIndex((item, index) => {
      return index > sliceIndex && item === value;
    });
    const backIndex = items.length - 1 - [...items].reverse().indexOf(value);
    return randomIndex != -1 ? randomIndex : backIndex;
  }
  getRandomOffset() {
    return _.random(-0.45, 0.45, true);
  }
  setFinishTimeouts() {
    const showRewardDelay = BASE_SLIDER_SPEED + SLIDERS_SPEED_DIFFERENCE;
    setTimeout(() => {
      this.setState({
        showReward: true,
      })
    }, showRewardDelay);

    setTimeout(() => {
      this.setState({
        showReward: false,
      });
      this.props.onSpinFinished();
    }, showRewardDelay + REWARD_ANIMATION_DURATION);
  }
  play() {
    const { result, coeficient } = this.props;
    this.resultSlider.slickGoTo(0, true);
    this.coefficientSlider.slickGoTo(0, true);
    setTimeout(() => {
      const resultIndex = this.getNextIndex(result, this.state.resultItems);
      const coeficientIndex = this.getNextIndex(coeficient, this.state.coeficientItems);
      this.resultSlider.slickGoTo(resultIndex + this.getRandomOffset());
      this.coefficientSlider.slickGoTo(coeficientIndex + this.getRandomOffset());
    });
    this.setFinishTimeouts();
  }
  render() {
    const {
      classes,
      onClickPlay,
      inProgress,
      result,
      coeficient,
      prize,
      bid,
    } = this.props;
    const {
      showReward,
      resultItems,
      coeficientItems,
    } = this.state;

    return (
      <div className={classes.roulette}>
        <div className={classes.arrows}>
          <Icon type="down" />
        </div>
        <div className={`${classes.resultSlider} ${classes.slider}`}>
          <Slider {...SETTINGS} ref={(ref) => { this.resultSlider = ref }}>
            {
              resultItems.map((win, index) => {
                return (
                  <RouletteItem key={index} type={win ? 'win' : 'lose'}>
                    {win ? `+${prize}` : `-${bid}`} <Coins />
                  </RouletteItem>
                )
              })
            }
          </Slider>
        </div>
        <div className={`${classes.coefficientSlider} ${classes.slider}`}>
          <Slider
            {...{ ...SETTINGS, speed: BASE_SLIDER_SPEED + SLIDERS_SPEED_DIFFERENCE }}
            ref={(ref) => { this.coefficientSlider = ref }}
          >
            {
              coeficientItems.map((item, index) => {
                return (
                  <RouletteItem key={index} coefficient={item}>
                    x{item}
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
          onClick={() => {onClickPlay(); this.play();}}
        >
          Play!
        </Button>
        {
          showReward && <div className={`${classes.reward} ${result ? 'win' : 'lose'} animated fadeOutUp`}>
            {result ? `+${prize * coeficient}` : `-${bid * coeficient}`} <Coins />
          </div>
        }
      </div>
    );
  }
}

const styles = {
  roulette: {
    position: 'relative',
    'text-align': 'center',
    '& .slick-track': {
      'transition-timing-function': 'cubic-bezier(0, 0.9, 0.5, 1) !important',
    },
  },
  slider: {
    'box-shadow': '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  coefficientSlider: {
    'margin-top': 20,
  },
  arrows: {
    'font-size': '50px',
    display: 'flex',
    'flex-direction': 'column',
    color: 'white',
  },
  playButton: {
    'box-shadow': '0px 0px 10px 0px rgba(0,0,0,0.75)',
    height: 'auto',
    'font-size': '30px',
    padding: '10px 20px',
    background: greenColor,
    'border-color': greenColor,
    '&:hover, &:active, &:focus': {
      background: lightGreenColor,
      'border-color': lightGreenColor,
    }
  },
  reward: {
    'z-index': -2,
    position: 'absolute',
    left: 0,
    right: 0,
    'font-size': '60px',
    'animation-duration': REWARD_ANIMATION_DURATION,
    '&.win': {
      color: greenColor,
    },
    '&.lose': {
      color: redColor,
    }
  },
};

export default injectSheet(styles)(Roulette);

Roulette.defaultProps = {
  inProgress: false
};

Roulette.propTypes = {
  classes: PropTypes.object.isRequired,
  result: PropTypes.bool.isRequired,
  coeficient: PropTypes.number.isRequired,
  chancePercentage: PropTypes.number.isRequired,
  prize: PropTypes.number.isRequired,
  bid: PropTypes.number.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onSpinFinished: PropTypes.func.isRequired,
  inProgress: PropTypes.bool,
};
