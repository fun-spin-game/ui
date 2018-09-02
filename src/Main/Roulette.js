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
import withGameConfig from '../containers/withGameConfig';

const Roulette = ({
  classes,
  prize,
  risk,
  maxAttemptsReached,
  lowBalance,
  play,
  sliderAfterChange,
  resultSlider,
  resultItems,
  showReward,
  spinInProgress,
  prevResult,
  playBtnClicked,
  gameConfig: { GAME_SPIN_DELAY },
}) => {
  const SETTINGS = {
    infinite: true,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    centerMode: true,
    speed: GAME_SPIN_DELAY,
    initialSlide: 0,
  };

  let slidesToShow;
  if (window.innerWidth < 400) slidesToShow = 1;
  else if (window.innerWidth < 1200) slidesToShow = 3;
  else if (window.innerWidth < 1400) slidesToShow = 5;
  else slidesToShow = 7;
  SETTINGS.slidesToShow = slidesToShow;

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
          disabled={playBtnClicked || spinInProgress}
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
    '@media(max-width: 666px)': {
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
    '&.win': {
      color: greenColor,
    },
    '&.lose': {
      color: redColor,
    },
    '@media(max-width: 666px)': {
      top: -110,
      fontSize: '45px',
    }
  },
};

export default compose(
  withGameConfig(),
  injectSheet(styles),
  withState('prevResult', 'setPrevResult', null),
  withState('showReward', 'setShowReward', null),
  withState('playBtnClicked', 'setPlayBtnClicked', false),
  withState('resultItems', 'setResultItems', ({ chanceToWin }) => _.shuffle(_.fill(Array(chanceToWin), true)
    .concat(_.fill(Array(100 - chanceToWin), false)))
    .slice(0, 50)),
  pure,
  withProps({
    resultSlider: React.createRef(),
  }),
  withHandlers({
    play: ({
      resultSlider,
      resultItems,
      onClickPlay,
      lowBalance,
      result,
      setShowReward,
      setResultItems,
      setPlayBtnClicked,
      setPrevResult,
    }) => () => {
      if (lowBalance) return;
      onClickPlay({ result });
      resultSlider.current.slickGoTo(0, true);

      setPlayBtnClicked(true);

      const newResultItems = _.shuffle(resultItems);
      const resultIndex = 49;

      newResultItems[resultIndex] = result;
      setShowReward(false);
      setPrevResult(result);

      setResultItems(newResultItems, () => {
        setTimeout(() => resultSlider.current.slickGoTo(resultIndex + _.random(-0.45, 0.45, true)), 100);
      });
    },
    sliderAfterChange: ({ setShowReward, setPlayBtnClicked }) => (slideIndex) => {
      if (slideIndex) {
        setShowReward(true);
        setPlayBtnClicked(false);
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
  gameConfig: PropTypes.object.isRequired,
  resultSlider: PropTypes.object.isRequired,
  prize: PropTypes.number.isRequired,
  chanceToWin: PropTypes.number.isRequired,
  risk: PropTypes.number.isRequired,
  result: PropTypes.bool,
  prevResult: PropTypes.bool,
  onClickPlay: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  setPlayBtnClicked: PropTypes.func.isRequired,
  playBtnClicked: PropTypes.bool.isRequired,
  sliderAfterChange: PropTypes.func.isRequired,
  spinInProgress: PropTypes.bool.isRequired,
  maxAttemptsReached: PropTypes.bool,
  lowBalance: PropTypes.bool,
  showReward: PropTypes.bool,
  resultItems: PropTypes.array.isRequired,
};
