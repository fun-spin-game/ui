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
import {
  GAME_GAME_SPIN_DELAY,
  ROULETTE_REWARD_ANIMATION_DURATION,
} from '../config';

let slidesToShow
if (window.innerWidth < 400) slidesToShow = 2;
else if (window.innerWidth < 600) slidesToShow = 3;
else slidesToShow = 7;

const SETTINGS = {
 infinite: true,
 slidesToShow,
 slidesToScroll: 1,
 arrows: false,
 draggable: false,
 centerMode: true,
 speed: GAME_GAME_SPIN_DELAY,
 initialSlide: 0,
};
class Roulette extends Component {
  constructor({ chanceToWin }) {
    super();
    this.play = this.play.bind(this);
    this.onSpinDone = this.onSpinDone.bind(this);
    this.state = {
      result: null,
      prevResult: null,
      showReward: false,
      resultItems: _.shuffle(_.fill(Array(chanceToWin), true)
      .concat(_.fill(Array(100 - chanceToWin), false)))
      .slice(0, 50),
    }
  }
  async play() {
    const { onClickPlay, lowBalance, result } = this.props;
    if (lowBalance) return;

    const newResultItems = _.shuffle(this.state.resultItems);
    const resultIndex = 49;

    newResultItems[49] = result;

    this.resultSlider.slickGoTo(0, true);
    this.setState({ result, resultItems: newResultItems, showReward: false });
    setTimeout(() => {
      this.resultSlider.slickGoTo(resultIndex + _.random(-0.45, 0.45, true));
      onClickPlay({ result });
    }, 100);
  }
  onSpinDone({ result }) {
    this.setState({
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
      spinInProgress,
      lowBalance,
    } = this.props;
    const {
      showReward,
      resultItems,
      prevResult,
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
            spinInProgress={spinInProgress}
            lowBalance={lowBalance}
            play={this.play.bind(this)}
          />
        </div>
        {
          showReward && <div className={`${classes.reward} ${prevResult ? 'win' : 'lose'}`}>
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
    '& .slick-track': {
      willChange: 'transform',
    }
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
    '@media(max-width: 600px)': {
      top: 175,
    }
  },
  reward: {
    'z-index': -2,
    position: 'absolute',
    left: 0,
    right: 0,
    top: -160,
    'font-size': '60px',
    'animation-duration': ROULETTE_REWARD_ANIMATION_DURATION,
    '&.win': {
      color: greenColor,
    },
    '&.lose': {
      color: redColor,
    },
    '@media(max-width: 600px)': {
      top: -110,
      fontSize: '45px',
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
  result: PropTypes.bool.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  onSpinFinished: PropTypes.func.isRequired,
  maxAttemptsReached: PropTypes.bool,
  lowBalance: PropTypes.bool,
  spinInProgress: PropTypes.bool,
};
