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
const REWARD_ANIMATION_DURATION = 4000;
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
const AUTOPLAY_DELAY_IN_SEC = 15;
class Roulette extends Component {
  constructor({ chancePercentage }) {
    super();
    const coeficients = Array.apply(null, Array(11)).map(function (x, i) { return i / 10; });

    this.state = {
      result: null,
      coeficient: null,
      showReward: false,
      inProgress: false,
      resultItems: Array.apply(null, Array(chancePercentage)).map(() =>{
        return true;
      })
      .concat(Array.apply(null, Array(100 - chancePercentage)).map(() =>{
        return false;
      }))
      .sort(() => {
        return Math.random() >= 0.5 ? 1 : -1;
      }),
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
        return Math.random() >= 0.5 ? 1 : -1;
      }),
      autoPlayInterval: this.setAutoPlayInterval(),
      autoPlayIntervalCounter: 0,
    }
  }
  setAutoPlayInterval() {

    return setInterval(() => {
      if (this.state.autoPlayIntervalCounter >= AUTOPLAY_DELAY_IN_SEC) {
        this.play();
      } else {
        this.setState({
          autoPlayIntervalCounter: this.state.autoPlayIntervalCounter + 1
        });
      }
    }, 1000);
  }
  getNextIndex({ value, items }) {
    const minIndex = 60;
    const sliceIndex = _.random(minIndex, items.length - 1);
    const randomIndex = items.findIndex((item, index) => {
      return index > sliceIndex && item === value;
    });
    const backIndex = items.length - 1 - [...items].reverse().indexOf(value);
    return randomIndex !== -1 ? randomIndex : backIndex;
  }
  getRandomOffset() {
    return _.random(-0.45, 0.45, true);
  }
  play() {
    clearInterval(this.state.autoPlayInterval);
    this.setState({
      autoPlayIntervalCounter: 0,
      autoPlayInterval: null,
    });

    const { chancePercentage, onClickPlay } = this.props;
    const { coeficientItems } = this.state;
    const resultIndex = this.getNextIndex({
      value: Math.random() >= (chancePercentage / 100),
      items: this.state.resultItems,
    });
    const coeficientIndex = this.getNextIndex({
      value: _.sample(coeficientItems),
      items: coeficientItems,
    });

    this.setState({ inProgress: true });
    onClickPlay();

    this.resultSlider.slickGoTo(0, true);
    this.coefficientSlider.slickGoTo(0, true);
    setTimeout(() => {
      this.resultSlider.slickGoTo(resultIndex + this.getRandomOffset());
      this.coefficientSlider.slickGoTo(coeficientIndex + this.getRandomOffset());
    });
    this.setFinishTimeouts({ resultIndex, coeficientIndex });
  }
  setFinishTimeouts({ resultIndex, coeficientIndex }) {
    const showRewardDelay = BASE_SLIDER_SPEED + SLIDERS_SPEED_DIFFERENCE;
    const result = this.state.resultItems[resultIndex];
    const coeficient = this.state.coeficientItems[coeficientIndex];

    setTimeout(() => {
      this.setState({
        showReward: true,
        inProgress: false,
        result,
        coeficient,
        autoPlayInterval: this.setAutoPlayInterval(),
      })
    }, showRewardDelay);

    setTimeout(() => {
      this.setState({
        showReward: false,
      });
      this.props.onSpinFinished({ result, coeficient });
    }, showRewardDelay + REWARD_ANIMATION_DURATION);
  }
  render() {
    const {
      classes,
      prize,
      bid,
      disabled,
    } = this.props;
    const {
      inProgress,
      showReward,
      resultItems,
      coeficientItems,
      result,
      coeficient,
      autoPlayIntervalCounter,
      autoPlayInterval,
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
          disabled={inProgress || disabled}
          className={`play-button ${classes.playButton}`}
          onClick={() => {this.play();}}
        >
          Play! {autoPlayInterval && !inProgress && <span>({ AUTOPLAY_DELAY_IN_SEC - autoPlayIntervalCounter })</span>}
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
};

Roulette.propTypes = {
  classes: PropTypes.object.isRequired,
  chancePercentage: PropTypes.number.isRequired,
  prize: PropTypes.number.isRequired,
  bid: PropTypes.number.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onSpinFinished: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
