import React from 'react';
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { compose, withProps } from 'recompose';
import { Circle, Line } from 'rc-progress';
import { Button, Avatar } from 'antd';
import { blueColor, greenColor, lightGreenColor, redColor } from '../variables';
import Coins from '../common/Coins';
import { toFixedIfNeed } from '../helpers/gameUtils';
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';
import Tooltip from '../common/Tooltip';

const getColor = (value) => {
  const hue = ((value) * 120).toString(10);
  return ["hsl(",hue,",85%,50%)"].join("");
}

const GameItem = ({
  id,
  classes,
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
  notWonYet,
}) => {
  return (
    <div
      className={classNames(classes.gameItem, {
        inProgress: gamePlayer,
        won,
        lost,
        disabled,
        ownGame: creatorUser && creatorUser.id === userInfo.id
      })}
    >
      <div className={`game-item-content ${classes.gameItemContent}`}>
        <div
          className={`${gamePlayer ? `animated infinite flash ${classes.flashAnimation}`: ''} ${won ? 'tada animated': ''}`}
        >
          <span className={classes.chanceToWin}>
            <Tooltip
              disable={!notWonYet}
              title="This lot was not won yet!"
            >
              {chanceToWin}% chance
            </Tooltip>
          </span>
          <div>
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
          {
            true && <span className={`${classes.notWonYet}`}></span>
          }
          <span
            className={`prize ${classes.prize} ${won ? 'fadeOutUp animated' : ''}`}
          >
            {prize} <Coins />
          </span>
          <span className={`${classes.bid} bid  ${lost ? 'fadeOutDown animated' : ''}`}>
            <Tooltip
              title="Low balance. Can not cover the risk"
              disable={!disabled}
            >
              Your risk: {toFixedIfNeed(risk)} <Coins />
            </Tooltip>
          </span>
          <div className={classes.playButtonContainer}>
            <Button
              type="primary"
              className={`play-button ${classes.playButton}`}
              onClick={() => onClickPlay({ gameId: id })}
            >
              Play!
            </Button>
          </div>
          <div className={classes.amountOfAttempts}>
             <Line percent={amountOfAttemptsPercentage} strokeWidth="2" trailWidth="2" trailColor="#f5f5f5" strokeColor={blueColor} />
             <div>{amountOfAttempts}/{maxAttempts} <span className={`info`}><small>attempts used</small></span></div>
             <div>{(gamePlayer) && 'In progress...'}</div>
          </div>
        </div>
        {
          (gamePlayer) &&
          <div className={classes.playerAvatarContainer}>
            <Avatar className={`player-avatar ${classes.playerAvatar}`} src={gamePlayer.photo} />
          </div>
        }
        {
          (creatorUser) &&
          <div className={classes.creatorAvatarContainer}>
            <Avatar size="small" className={`creatorAvatar ${classes.creatorAvatar}`} src={creatorUser.photo} />
          </div>
        }
      </div>
    </div>
  )
};

const styles = {
  gameItem: {
    'text-align': 'center',
    height: 250,
    'padding': 35,
    '&:not(.inProgress):not(.won):not(.lost):hover:not(.disabled):not(.ownGame)': {
      '& .game-item-content': {
        transform: 'scale(1.3)',
      },
      '& .prize': {
        top: 45,
        'font-size': '18px',
      },
      '& .bid': {
        opacity: 1,
      },
      '& .play-button': {
        visibility: 'visible',
        opacity: 1,
      }
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
      '& .game-item-content': {
        transform: 'scale(1.3)',
      },
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
    }
  },
  gameItemContent: {
    transition: 'all 300ms ease',
    'transform-origin': '50% 50%',
    position: 'relative',
    display: 'inline-block',
  },
  'chanceToWin': ({ notWonYet }) => ({
    'font-size': '14px',
    color: notWonYet ? greenColor : 'inherited',
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
  bid: ({ disabled }) => ({
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
  withGames(),
  withProps(({
    id,
    getAmountOfAttempts,
    maxAttempts,
  }) => {
    const amountOfAttempts = getAmountOfAttempts({ gameId: id });
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
};

GameItem.propTypes = {
  classes: PropTypes.object.isRequired,
  gamePlayer: PropTypes.object,
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
  getAmountOfAttempts: PropTypes.func.isRequired,
  amountOfAttemptsPercentage: PropTypes.number.isRequired,
  amountOfAttempts: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired,
};
