import React from 'react';
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { compose, withHandlers, pure, withProps } from 'recompose';
import { Circle, Line } from 'rc-progress';
import { Button, Avatar } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { blueColor, greenColor, lightGreenColor, redColor } from '../variables';
import Coins from '../common/Coins';
import { toFixedIfNeed } from '../helpers/gameUtils';
import withGamesActions from '../containers/withGamesActions';
import Tooltip from '../common/Tooltip';

export const getColor = (value) => {
  const hue = ((value) * 120).toString(10);
  return ['hsl(', hue, ',85%,50%)'].join('');
};

const GameItem = (props) => {
  const {
    classes,
    style,
    preview,
    chanceToWin,
    prize,
    maxAttempts,
    connectedUser,
    creatorUser,
    risk,
    translate,
    play,
    lowBalance,
    maxAttemptsReached,
    amountOfAttempts,
    amountOfAttemptsPercentage,
    ownGame,
  } = props;
  return (
    <div
      style={style}
      className={classes.gameItem}
    >
      <div
        className={classNames({
          [`animated infinite flash ${classes.flashAnimation}`]: connectedUser,
        })}
      >
        <div
          className={classNames(
            'game-item-content',
            classes.gameItemContent,
            {
              inProgress: connectedUser,
              disabled: lowBalance || maxAttemptsReached,
              ownGame,
              preview,
              previewChanceToWin: preview === 'chanceToWin',
              previewPrize: preview === 'prize',
              previewRisk: preview === 'risk',
              previewAmountOfAttempts: preview === 'amountOfAttempts',
              previewPlay: preview === 'play',
            }
          )}
        >
          <span className={classNames(classes.chanceToWin, 'chanceToWin')}>
            <Tooltip
              disable={true}
              title={`${translate('THIS_LOT_WAS_NOT_WON_YET')}!`}
            >
              {chanceToWin}% {translate('CHANCE')}
            </Tooltip>
          </span>
          <div className={'circle'}>
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
            className={classNames(classes.prize, 'prize')}
          >
            {prize} <Coins />
          </span>
          <span className={classNames(classes.risk, 'risk')}>
            <Tooltip
              title={`${translate('CAN_NOT_COVER_THE_RISK')}`}
              disable={!lowBalance}
            >
              {translate('YOU_RISK')}: {toFixedIfNeed(risk)} <Coins />
            </Tooltip>
          </span>
          <div className={classNames(classes.playButtonContainer, 'playButtonContainer')}>
            <Button
              type="primary"
              className={classNames(classes.playButton, 'playButton')}
              onClick={play}
            >
              {translate('PLAY')}!
            </Button>
          </div>
          <div className={classNames(classes.amountOfAttempts, 'amountOfAttempts')}>
             <Line className={classes.attemptsline} percent={amountOfAttemptsPercentage} strokeWidth="2" trailWidth="2" trailColor="#f5f5f5" strokeColor={blueColor} />
             <Tooltip
               title={`${translate('MAX_ATTEMPTS_REACHED')}`}
               disable={!maxAttemptsReached}
             >
               <div>{amountOfAttempts}/{maxAttempts} <span className={`info`}><small>{translate('ATTEMPTS_USED')}</small></span></div>
              </Tooltip>
             <div>{(connectedUser) && `${translate('IN_PROGRESS')}...`}</div>
          </div>
          {
            connectedUser &&
            <div className={classNames(classes.playerAvatarContainer, 'playerAvatarContainer')}>
              <Avatar
                className={classNames(classes.playerAvatar, 'playerAvatar')}
                icon="user"
                src={connectedUser.photo}
              />
            </div>
          }
          {
            ownGame &&
            <div className={classes.creatorAvatarContainer}>
              <Avatar size="small" className={`creatorAvatar ${classes.creatorAvatar}`} icon="user"
                      src={creatorUser ? creatorUser.photo : null}/>
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
    '@media(max-width: 666px)': {
      transform: 'scale(.7) translate(0px, -20px)',
      height: 170,
    },
  },
  gameItemContent: {
    transition: 'all 300ms ease',
    'transform-origin': '50% 50%',
    position: 'relative',
    display: 'inline-block',
    '&:not(.inProgress):not(.disabled):not(.ownGame):not(.preview):hover, &.previewPlay': {
      transform: 'scale(1.3)',
      '& .prize': {
        top: 45,
        'font-size': '18px',
      },
      '& .risk': {
        opacity: 1,
      },
      '& .playButtonContainer': {
        visibility: 'visible',
        opacity: 1,
      },
    },
    '&.disabled > *': {
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
  risk: ({ lowBalance }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 125,
    'font-size': 10,
    color: lowBalance ? redColor : 'inherited',
  }),
  amountOfAttempts: ({ maxAttemptsReached }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 140,
    'font-size': '14px',
    whiteSpace: 'nowrap',
    color: maxAttemptsReached ? redColor : 'inherited',
  }),
  playButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 80,
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 300ms ease',
  },
  playButton: {
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
    left: 0,
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
  circle: {
    opacity: 1
  },
  attemptsline: {
    width: '100%',
  },
};

export default compose(
  withLocalize,
  withGamesActions(),
  withProps(({ creatorUser, balance, risk, won, lost, maxAttempts, userId }) => {
    const amountOfAttempts = won + lost;
    return {
      lowBalance: balance < risk,
      maxAttemptsReached: amountOfAttempts >= maxAttempts,
      amountOfAttempts,
      amountOfAttemptsPercentage: amountOfAttempts / maxAttempts * 100,
      ownGame: !!creatorUser && creatorUser.id === userId,
    };
  }),
  withHandlers({
    play: ({ connectToGame, id, preview }) =>  () => {
      if (preview) return;
      connectToGame({ gameId: id })
    }
  }),
  injectSheet(styles),
  pure,
)(GameItem);

GameItem.defaultProps = {
  connectedUser: null,
  creatorUser: null,
  style: {},
  preview: null,
  userId: null,
  balance: null,
};

GameItem.propTypes = {
  classes: PropTypes.object.isRequired,
  preview: PropTypes.string,
  style: PropTypes.object,
  won: PropTypes.number.isRequired,
  lowBalance: PropTypes.bool.isRequired,
  maxAttemptsReached: PropTypes.bool.isRequired,
  lost: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  chanceToWin: PropTypes.number.isRequired,
  prize: PropTypes.number.isRequired,
  risk: PropTypes.number.isRequired,
  maxAttempts: PropTypes.number.isRequired,
  creatorUser: PropTypes.object,
  connectToGame: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  userId: PropTypes.number,
  balance: PropTypes.number,
  connectedUser: PropTypes.object,
  amountOfAttempts: PropTypes.number.isRequired,
  amountOfAttemptsPercentage: PropTypes.number.isRequired,
  ownGame: PropTypes.bool.isRequired,
};
