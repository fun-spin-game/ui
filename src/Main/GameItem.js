import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Circle, Line } from 'rc-progress';
import { Button, Avatar } from 'antd';
import { blueColor, greenColor, lightGreenColor, redColor } from '../variables';
import Coins from '../common/Coins';

class GameItem extends Component {
  getColor(value) {
    const hue = ((value) * 120).toString(10);
    return ["hsl(",hue,",85%,50%)"].join("");
  }

  render() {
    const {
      classes,
      percentage,
      prize,
      bid,
      maxTries,
      tries,
      inProgress,
      won,
      lost,
    } = this.props;

    const triesPercentage = tries / maxTries * 100;
    return (
      <div className={`${classes.gameItem} ${inProgress ? 'in-progress': ''} ${won ? 'won': ''} ${lost ? 'lost': ''}`}>
        <div className={`game-item-content ${classes.gameItemContent}`}>
          <div
            className={`${inProgress ? `animated infinite flash ${classes.flashAnimation}`: ''} ${won ? 'tada animated': ''}`}
          >
            <span className={classes.percentage}>{percentage}% <small>chance</small></span>
            <div>
              <Circle
                className={classes.circle}
                percent={percentage}
                gapDegree={95}
                gapPosition="bottom"
                strokeWidth="7"
                strokeLinecap="round"
                strokeColor={this.getColor(percentage / 100)}
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
            <span className={`${classes.bid} bid  ${lost ? 'fadeOutDown animated' : ''}`}>
              Your risk: {bid} <Coins />
            </span>
            <div className={classes.playButtonContainer}>
              <Button type="primary" className={`play-button ${classes.playButton}`}>Play!</Button>
            </div>
            <div className={classes.tries}>
               <Line percent={triesPercentage} strokeWidth="2" trailWidth="2" trailColor="#f5f5f5" strokeColor={blueColor} />
               <div>{tries}/{maxTries} <span className={`info`}><small>users tried</small></span></div>
               <div>{(inProgress || won || lost) && 'In progress...'}</div>
            </div>
          </div>
          {
            (inProgress || won || lost) &&
            <div className={classes.playerAvatarContainer}>
              <Avatar size="small" className={`player-avatar ${classes.playerAvatar}`} icon="user" />
            </div>
          }
        </div>
      </div>
    )
  }
}

const styles = {
  gameItem: {
    'text-align': 'center',
    height: 250,
    'padding': 35,
    '&:not(.in-progress):not(.won):not(.lost):hover': {
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
  },
  gameItemContent: {
    transition: 'all 300ms ease',
    'transform-origin': '50% 50%',
    position: 'relative',
    display: 'inline-block',
  },
  'percentage': {
    'font-size': '14px',
  },
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
  bid: {
    transition: 'all 300ms ease',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 125,
    'font-size': 10,
  },
  tries: {
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
  playerAvatar: {
  },
  playerAvatarLoader: {
    position: 'absolute',
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

export default injectSheet(styles)(GameItem);

GameItem.defaultProps = {
  inProgress: false,
  success: false,
  binary: true,
};

GameItem.propTypes = {
  classes: PropTypes.object.isRequired,
  inProgress: PropTypes.bool,
  won: PropTypes.bool,
  lost: PropTypes.bool,
  id: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  prize: PropTypes.number,
  bid: PropTypes.number,
  tries: PropTypes.number.isRequired,
  maxTries: PropTypes.number.isRequired,
};
