import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import injectSheet from 'react-jss'
import { compose, branch, renderComponent } from 'recompose';
import { greenColor, lightGreenColor } from '../variables'
let {
  REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY,
} = process.env;

const autoplayNotificationDelay = REACT_APP_ROULETTE_AUTOPLAY_NOTIFICATION_DELAY / 1000;

const RoulettePlayBtn = ({ inProgress, autoplayIntervalStarted, autoPlayIntervalCounter, classes, play }) => (
  <Button
    type="primary"
    size="large"
    disabled={inProgress}
    className={`play-button ${classes.playButton}`}
    onClick={() => {play();}}
  >
    Play! {!inProgress && autoplayIntervalStarted && <span>({ autoplayNotificationDelay - autoPlayIntervalCounter })</span>}
  </Button>
)

const styles = {
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
  text: {
    color: 'white',
    fontSize: 30,
  }
}

const Text = compose(
  injectSheet({
    text: {
      color: 'white',
      fontSize: 30,
    }
  })
)(({ children, classes }) => <div className={classes.text}>{children}</div>);

export default compose(
  injectSheet(styles),
  branch(
    ({ lowBalance }) => lowBalance,
    renderComponent(() => (<Text>Low balance!</Text>)),
  ),
  branch(
    ({ maxAttemptsReached }) => maxAttemptsReached,
    renderComponent(() => (<Text>Game completed! Please wait...</Text>)),
  ),
)(RoulettePlayBtn);

RoulettePlayBtn.propTypes = {
  maxAttemptsReached: PropTypes.bool.isRequired,
  lowBalance: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  autoplayIntervalStarted: PropTypes.bool.isRequired,
  autoPlayIntervalCounter: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
