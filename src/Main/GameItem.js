import React from 'react';
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { compose, withProps } from 'recompose';
import { Circle, Line } from 'rc-progress';
import { Button, Avatar } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { blueColor, greenColor, lightGreenColor, redColor } from '../variables';
import Coins from '../common/Coins';
import { toFixedIfNeed } from '../helpers/gameUtils';
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';
import Tooltip from '../common/Tooltip';

export const getColor = (value) => {
  const hue = ((value) * 120).toString(10);
  return ["hsl(", hue, ",85%,50%)"].join("");
};

const GameItem = (props) => {
  const {
    id,
    classes,
    style,
    preview,
    chanceToWin,
    prize,
    maxAttempts,
    gamePlayer,
    creatorUser,
    won,
    lost,
    onClickPlay,
    risk,
    disabled,
    amountOfAttemptsPercentage,
    amountOfAttempts,
    userInfo,
    translate,
  } = props;
  const animationClass = `animated infinite flash ${classes.flashAnimation}`;
  return (
    <div
      style={style}
      className={classes.gameItem}
    >
      <div
        className={classNames({
          [animationClass]: gamePlayer,
          'tada animated': won
        })}
      >
        <div
          className={classNames(
            'game-item-content',
            classes.gameItemContent,
            {
              inProgress: gamePlayer,
              won,
              lost,
              disabled,
              ownGame: creatorUser && creatorUser.id === userInfo.id,
              preview,
              previewChanceToWin: preview === 'chanceToWin',
              previewPrize: preview === 'prize',
              previewRisk: preview === 'risk',
              previewAmountOfAttempts: preview === 'amountOfAttempts',
              previewPlay: preview === 'play',
            }
          )}
        >
          <span className={`chanceToWin ${classes.chanceToWin}`}>
            <Tooltip
              disable={true}
              title={`${translate('THIS_LOT_WAS_NOT_WON_YET')}!`}
            >
              {chanceToWin}% {translate('CHANCE')}
            </Tooltip>
          </span>
          <div className={`circle`}>
            <Circle
              className={classes.circle}
              percent={chanceToWin}
              gapDegree={95}
              gapPosition="bottom"
              strokeWidth="7"
              strokeLinecap="round"
              strokeColor={getColor(chanceToWin / 100)}
              trailWidth="7"
              trailColor="#f5f5f5"
              style={{
                width: 150,
                height: 150
              }}
            />
          </div>
          <span
            className={`prize ${classes.prize} ${won ? 'fadeOutUp animated' : ''}`}
          >
            {prize} <Coins />
          </span>
          <span className={`${classes.risk} risk  ${lost ? 'fadeOutDown animated' : ''}`}>
            <Tooltip
              title={`${translate('LOW_BALANCE')}. ${translate('CAN_NOT_COVER_THE_RISK')}`}
              disable={!disabled}
            >
              {translate('YOU_RISK')}: {toFixedIfNeed(risk)} <Coins />
            </Tooltip>
          </span>
          <div className={`playButtonContainer ${classes.playButtonContainer}`}>
            <Button
              type="primary"
              className={`play-button ${classes.playButton}`}
              onClick={() => onClickPlay({ gameId: id })}
            >
              {translate('PLAY')}!
            </Button>
          </div>
          <div className={`amountOfAttempts ${classes.amountOfAttempts}`}>
             <Line percent={amountOfAttemptsPercentage} strokeWidth="2" trailWidth="2" trailColor="#f5f5f5" strokeColor={blueColor} />
             <div>{amountOfAttempts}/{maxAttempts} <span className={`info`}><small>{translate('ATTEMPTS_USED')}</small></span></div>
             <div>{(gamePlayer) && `${translate('IN_PROGRESS')}...`}</div>
          </div>
          {
            (gamePlayer) &&
            <div className={`playerAvatarContainer ${classes.playerAvatarContainer}`}>
              <Avatar className={`playerAvatar ${classes.playerAvatar}`} src={gamePlayer.photo} />
            </div>
          }
        </div>
      </div>
    </div>
  )
};

const styles = {
  gameItem: {
    'text-align': 'center',
    height: 250,
    'padding': 35,
    '@media(max-width: 600px)': {
      transform: 'scale(.7) translate(0px, -20px)',
      height: 170,
    },
  },
  gameItemContent: {
    transition: 'all 300ms ease',
    'transform-origin': '50% 50%',
    position: 'relative',
    display: 'inline-block',
    '&:not(.inProgress):not(.won):not(.lost):not(.disabled):not(.ownGame):not(.preview):hover, &.previewPlay': {
      transform: 'scale(1.3)',
      '& .prize': {
        top: 45,
        'font-size': '18px',
      },
      '& .risk': {
        opacity: 1,
      },
      '& .play-button': {
        visibility: 'visible',
        opacity: 1,
      },
    },
    '&.won': {
      color: greenColor,
      '& .prize': {
        transform: 'scale(1.3)',
        '&:before': {
          content: '"+"',
          display: 'inline-block',
        },
      },
      transform: 'scale(1.3)',
    },
    '&.lost': {
      color: redColor,
    },
    '&.disabled': {
      opacity: .4
    },
    '&.ownGame': {
      '& .creatorAvatar': {
        border: `2px solid ${greenColor}`,
      }
    },
    '&.preview': {
      '& > *': {
        opacity: .2,
      },
    },
    '&.previewChanceToWin': {
      '& > .chanceToWin, & > .circle': {
        opacity: 1,
      }
    },
    '&.previewPrize': {
      '& > .prize': {
        opacity: 1,
      }
    },
    '&.previewRisk': {
      '& > .risk': {
        opacity: 1,
      }
    },
    '&.previewAmountOfAttempts': {
      '& > .amountOfAttempts': {
        opacity: 1,
      }
    },
    '&.previewPlay': {
      '& > .playButtonContainer': {
        opacity: 1,
      }
    }
  },
  'chanceToWin': ({ notWonYet }) => ({
    'font-size': '14px',
    color: notWonYet ? 'inherited' : 'inherited',
  }),
  prize: {
    transition: 'all 300ms ease',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 70,
    'font-size': '25px',
    'z-index': 1,
    'white-space': 'nowrap'
  },
  risk: ({ disabled }) => ({
    transition: 'all 300ms ease',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 125,
    'font-size': 10,
    color: disabled ? redColor : 'inherited',
  }),
  amountOfAttempts: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 140,
    'font-size': '14px',
    whiteSpace: 'nowrap',
  },
  playButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
  },
  playButton: {
    visibility: 'hidden',
    opacity: 0,
    transition: 'all 300ms ease',
    background: greenColor,
    'border-color': greenColor,
    '&:hover, &:focus, &:active': {
      background: lightGreenColor,
      'border-color': lightGreenColor
    }
  },
  playerAvatarContainer: {
    position: 'absolute',
    left: 125,
    top: 185,
  },
  creatorAvatarContainer: {
    position: 'absolute',
    left: 125,
    top: 0,
  },
  creatorAvatar: {
    boxSizing: 'content-box',
  },
  playerAvatar: {
  },
  flashAnimation: {
    'animation-duration': '3s',
  },
  pulseAnimation: {
    'animation-duration': '.5s',
    'animation-iteration-count': '2',
  },
  'circle': {
    opacity: 1
  }
};

export default compose(
  withUser(),
  withLocalize,
  withGames(),
  withProps(({
    maxAttempts,
    amountOfAttempts,
  }) => {
    return {
      amountOfAttempts,
      amountOfAttemptsPercentage: amountOfAttempts / maxAttempts * 100,
    }
  }),
  injectSheet(styles)
)(GameItem);

GameItem.defaultProps = {
  gamePlayer: null,
  creatorUser: null,
  notWonYet: false,
  style: {},
  preview: null
};

GameItem.propTypes = {
  classes: PropTypes.object.isRequired,
  preview: PropTypes.string,
  gamePlayer: PropTypes.object,
  style: PropTypes.object,
  won: PropTypes.bool,
  disabled: PropTypes.bool,
  lost: PropTypes.bool,
  notWonYet: PropTypes.bool,
  id: PropTypes.number.isRequired,
  chanceToWin: PropTypes.number.isRequired,
  prize: PropTypes.number,
  risk: PropTypes.number,
  maxAttempts: PropTypes.number.isRequired,
  creatorUser: PropTypes.object,
  onClickPlay: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  amountOfAttemptsPercentage: PropTypes.number.isRequired,
  amountOfAttempts: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired,
};
