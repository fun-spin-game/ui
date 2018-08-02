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
  REACT_APP_ROULETTE_AUTOPLAY_DELAY,
  REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY,
} = process.env;
REACT_APP_GAME_GAME_SPIN_DELAY = parseInt(REACT_APP_GAME_GAME_SPIN_DELAY);
REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION = parseInt(REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION);
REACT_APP_ROULETTE_AUTOPLAY_DELAY = parseInt(REACT_APP_ROULETTE_AUTOPLAY_DELAY);
REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY = parseInt(REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY);
const SETTINGS = {
 infinite: true,
 slidesToShow: window.screen.width > 400 ? 7 : 3,
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
    this.setAutoPlayInterval = this.setAutoPlayInterval.bind(this);
    this.setAupoPlayNotificationTimeout = this.setAupoPlayNotificationTimeout.bind(this);
    this.getNextIndex = this.getNextIndex.bind(this);
    this.play = this.play.bind(this);
    this.onSpinDone = this.onSpinDone.bind(this);
    this.state = {
      result: null,
      prevResult: null,
      showReward: false,
      resultItems: _.shuffle(_.fill(Array(chanceToWin), true)
      .concat(_.fill(Array(100 - chanceToWin), false)))
      .slice(0, 50),
      autoPlayInterval: null,
      autoPlayNotificationTimeout: null,
      hideRewardTimeout: null,
      autoPlayIntervalCounter: 0,
    }
  }
  componentDidMount() {
    this.setAupoPlayNotificationTimeout(this.props);
  }
  componentWillUnmount() {
    clearInterval(this.state.autoPlayInterval);
    clearTimeout(this.state.autoPlayNotificationTimeout);
    clearTimeout(this.state.hideRewardTimeout);
  }
  setAutoPlayInterval() {
    this.setState({
      autoPlayInterval: setInterval(() => {
        if (this.state.autoPlayIntervalCounter >= REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY / 1000) {
          this.play();
        } else {
          this.setState({
            autoPlayIntervalCounter: this.state.autoPlayIntervalCounter + 1
          });
        }
      }, 1000)
    })
  }
  setAupoPlayNotificationTimeout({ lowBalance, maxAttemptsReached }) {
    if (lowBalance || maxAttemptsReached) return;
    const autoPlayNotificationTimeout = setTimeout(
      () => this.setAutoPlayInterval(),
      REACT_APP_ROULETTE_AUTOPLAY_DELAY - REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY
    )
    this.setState({
      autoPlayInterval: null,
      autoPlayNotificationTimeout,
    });
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
    clearTimeout(this.state.autoPlayNotificationTimeout);
    const { onClickPlay, lowBalance } = this.props;
    if (lowBalance) return;
    const newResultItems = _.shuffle(this.state.resultItems);
    const resultIndex = 50;
    const result = newResultItems[resultIndex];
    this.resultSlider.slickGoTo(0, true);
    this.setState({ autoPlayIntervalCounter: 0, result, resultItems: newResultItems });
    setTimeout(() => {
      this.resultSlider.slickGoTo(resultIndex + _.random(-0.45, 0.45, true));
      onClickPlay({ result });
    }, 0);
  }
  onSpinDone({ result }) {
    this.setAupoPlayNotificationTimeout(this.props);
    const hideRewardTimeout = setTimeout(() => {
      this.setState({
        showReward: false,
      })
    }, REACT_APP_ROULETTE_REWARD_ANIMATION_DURATION);
    this.setState({
      hideRewardTimeout,
      showReward: true,
      prevResult: this.state.result,
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
      prevResult,
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
            autoplayIntervalStarted={!!this.state.autoPlayInterval}
            play={this.play.bind(this)}
          />
        </div>
        {
          showReward && <div className={`${classes.reward} ${prevResult ? 'win' : 'lose'} animated fadeOutUp`}>
            {prevResult ? `+${prize}` : `-${toFixedIfNeed(risk)}`} <Coins />
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
    '@media(max-width: 400px)': {
      top: 220,
    }
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
