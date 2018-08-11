import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Slider from 'react-slick';
import { compose, withHandlers, withState, pure, withProps } from 'recompose';
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
const Roulette = ({
  classes,
  prize,
  risk,
  maxAttemptsReached,
  spinInProgress,
  lowBalance,
  play,
  sliderAfterChange,
  resultSlider,
  resultItems,
  showReward,
  prevResult,
}) => {
  return (
    <div className={classes.roulette}>
      <div className={classes.arrows}>
        <Icon type="down" />
      </div>
      <div className={`${classes.resultSlider} ${classes.slider}`}>
        <Slider
          {...SETTINGS}
          ref={resultSlider}
          afterChange={sliderAfterChange}
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
          play={play}
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
  injectSheet(styles),
  withState('result', 'setResult', null),
  withState('prevResult', 'setPrevResult', null),
  withState('showReward', 'setShowReward', null),
  withState('resultItems', 'setResultItems', ({ chanceToWin }) => _.shuffle(_.fill(Array(chanceToWin), true)
    .concat(_.fill(Array(100 - chanceToWin), false)))
    .slice(0, 50)),
  pure,
  withProps({
    resultSlider: React.createRef(),
  }),
  withHandlers({
    play: ({ resultSlider, resultItems, onClickPlay, lowBalance, result, setResult, setShowReward, setResultItems }) => () => {
      if (lowBalance) return;

      const newResultItems = _.shuffle(resultItems);
      const resultIndex = 49;
      newResultItems[49] = result;

      resultSlider.current.slickGoTo(0, true);

      setResult(result);
      setShowReward(false);
      setResultItems(newResultItems);
      onClickPlay({ result });
      setTimeout(() => resultSlider.current.slickGoTo(resultIndex + _.random(-0.45, 0.45, true)), 100);
    },
    sliderAfterChange: ({ result, setShowReward, setPrevResult }) => (slideIndex) => {
      if (slideIndex) {
        setPrevResult(result);
        setShowReward(true);
      }
    }
  }),
  pure,
)(Roulette);

Roulette.defaultProps = {
  result: null,
  showReward: null,
  prevResult: null,
  maxAttemptsReached: false,
  lowBalance: false,
  spinInProgress: false,
};

Roulette.propTypes = {
  classes: PropTypes.object.isRequired,
  resultSlider: PropTypes.object.isRequired,
  prize: PropTypes.number.isRequired,
  chanceToWin: PropTypes.number.isRequired,
  risk: PropTypes.number.isRequired,
  result: PropTypes.bool,
  prevResult: PropTypes.bool,
  onClickPlay: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  sliderAfterChange: PropTypes.func.isRequired,
  maxAttemptsReached: PropTypes.bool,
  lowBalance: PropTypes.bool,
  showReward: PropTypes.bool,
  spinInProgress: PropTypes.bool,
  resultItems: PropTypes.array.isRequired,
};
