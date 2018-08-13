import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import injectSheet from 'react-jss'
import { compose, branch, renderComponent, pure } from 'recompose';
import { withLocalize, Translate } from 'react-localize-redux';
import { greenColor, lightGreenColor } from '../variables'

const RoulettePlayBtn = ({
  disabled,
  classes,
  play,
  translate,
}) => (
  <Button
    type="primary"
    size="large"
    disabled={disabled}
    className={`play-button ${classes.playButton}`}
    onClick={play}
  >
    {translate('PLAY')}!
  </Button>
);

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
    },
    '@media(max-width: 666px)': {
      'font-size': '17px !important',
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
  withLocalize,
  branch(
    ({ lowBalance }) => lowBalance,
    renderComponent(() => (<Text><Translate id="LOW_BALANCE" />!</Text>)),
  ),
  branch(
    ({ maxAttemptsReached }) => maxAttemptsReached,
    renderComponent(() => (<Text><Translate id="GAME_COMPLETED" />!</Text>)),
  ),
  pure,
)(RoulettePlayBtn);

RoulettePlayBtn.propTypes = {
  maxAttemptsReached: PropTypes.bool.isRequired,
  lowBalance: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
