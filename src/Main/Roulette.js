import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Slider from 'react-slick';
import { compose } from 'recompose';
import _ from 'lodash';
import { Icon } from 'antd';
import RouletteItem from './RouletteItem';
import RoulettePlayBtn from './RoulettePlayBtn';
import Coins from '../common/Coins'
import { greenColor, redColor } from '../variables'
import { toFixedIfNeed } from '../helpers/gameUtils'
let {
  REACT_APP_GAME_GAME_SPIN_DELAY,
  REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION,
  REACT_APP_ROULETTE_AUTOPLAY_DELAY_IN_SEC,
} = process.env;
REACT_APP_GAME_GAME_SPIN_DELAY = parseInt(REACT_APP_GAME_GAME_SPIN_DELAY);
REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION = parseInt(REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION);
REACT_APP_ROULETTE_AUTOPLAY_DELAY_IN_SEC = parseInt(REACT_APP_ROULETTE_AUTOPLAY_DELAY_IN_SEC);
const SETTINGS = {
 infinite: true,
 slidesToShow: 7,
 slidesToScroll: 1,
 arrows: false,
 draggable: false,
 centerMode: true,
 speed: REACT_APP_GAME_GAME_SPIN_DELAY,
 initialSlide: 0,
};
class Roulette extends Component {
  constructor({ chanceToWin }) {
    super();
    this.state = {
      result: null,
      showReward: false,
      resultItems: _.shuffle(_.fill(Array(chanceToWin), true)
      .concat(_.fill(Array(100 - chanceToWin), false))),
      autoPlayInterval: this.setAutoPlayInterval(),
      hideRewardTimeout: null,
      autoPlayIntervalCounter: 0,
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.autoPlayInterval);
    clearTimeout(this.state.hideRewardTimeout);
  }

  setAutoPlayInterval() {
    return setInterval(() => {
      if (this.state.autoPlayIntervalCounter >= REACT_APP_ROULETTE_AUTOPLAY_DELAY_IN_SEC) {
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

  play() {
    clearInterval(this.state.autoPlayInterval);
    const { onClickPlay, lowBalance } = this.props;
    if (lowBalance) return;

    const result = _.sample(this.state.resultItems);
    const resultIndex = this.getNextIndex({ value: result, items: this.state.resultItems });
    this.setState({ autoPlayIntervalCounter: 0, result });
    this.resultSlider.slickGoTo(0, true);
    setTimeout(() => {
      this.resultSlider.slickGoTo(resultIndex + _.random(-0.45, 0.45, true));
      onClickPlay({ result });
    });
  }

  onSpinDone({ result }) {
    const hideRewardTimeout = setTimeout(() => {
      this.setState({
        showReward: false,
      });
    }, REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION);
    this.setState({
      hideRewardTimeout,
      showReward: true,
      autoPlayInterval: this.setAutoPlayInterval(),
    });
    this.props.onSpinFinished({ result });
  }

  render() {
    const {
      classes,
      prize,
      risk,
      maxAttemptsReached,
      inProgress,
      lowBalance,
    } = this.props;
    const {
      showReward,
      resultItems,
      result,
      autoPlayIntervalCounter,
    } = this.state;
    return (
      <div className={classes.roulette}>
        <div className={classes.arrows}>
          <Icon type="down" />
        </div>
        <div className={`${classes.resultSlider} ${classes.slider}`}>
          <Slider
            {...SETTINGS}
            ref={(ref) => { this.resultSlider = ref }}
            afterChange={(slideIndex) => slideIndex && this.onSpinDone({ result: this.state.result })}
          >
            {
              resultItems.map((win, index) => {
                return (
                  <RouletteItem key={index} type={win ? 'win' : 'lose'}>
                    {win ? `+${prize}` : `-${toFixedIfNeed(risk)}`} <Coins />
                  </RouletteItem>
                )
              })
            }
          </Slider>
        </div>
        <div className={classes.arrows}>
          <Icon type="up" />
        </div>
        <div className={classes.playBtnContainer}>
          <RoulettePlayBtn
            maxAttemptsReached={maxAttemptsReached}
            inProgress={inProgress}
            lowBalance={lowBalance}
            autoPlayIntervalCounter={autoPlayIntervalCounter}
            play={this.play.bind(this)}
          />
        </div>
        {
          showReward && <div className={`${classes.reward} ${result ? 'win' : 'lose'} animated fadeOutUp`}>
            {result ? `+${prize}` : `-${toFixedIfNeed(risk)}`} <Coins />
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
  arrows: {
    'font-size': '50px',
    display: 'flex',
    'flex-direction': 'column',
    color: 'white',
  },
  playBtnContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 270,
  },
  reward: {
    'z-index': -2,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -160,
    'font-size': '60px',
    'animation-duration': REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION,
    '&.win': {
      color: greenColor,
    },
    '&.lose': {
      color: redColor,
    }
  },
};

export default compose(
  injectSheet(styles)
)(Roulette);

Roulette.defaultProps = {
};

Roulette.propTypes = {
  classes: PropTypes.object.isRequired,
  prize: PropTypes.number.isRequired,
  chanceToWin: PropTypes.number.isRequired,
  risk: PropTypes.number.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onSpinFinished: PropTypes.func.isRequired,
  maxAttemptsReached: PropTypes.bool,
  lowBalance: PropTypes.bool,
  inProgress: PropTypes.bool,
};
