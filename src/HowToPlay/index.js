import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';
import { default as HowToPlayCommon } from '../common/HowToPlay';
import GameItem from '../Main/GameItem';

const GameItemPreview = ({ preview }) => (
  <GameItem
    style={{
      display: 'inline-block',
      padding: 0,
      height: 'auto',
      transform: 'scale(.8)'
    }}
    preview={preview}
    id={1}
    prize={30}
    risk={1}
    won={1}
    lost={1}
    creatorUser={null}
    chanceToWin={50}
    maxAttempts={5}
    amountOfAttempts={2}
    onClickPlay={() => {}}
    gamePlayer={null}
    userId={1}
    balance={100}
  />
);

GameItemPreview.propTypes = {
  preview: PropTypes.string.isRequired,
};

const HowToPlay = ({ classes, translate }) => {
  return (
    <div className={classes.howToPlay}>
      <PageTitle>{translate('HOW_TO_PLAY')}</PageTitle>
      <div>
        <HowToPlayCommon />
      </div>
    </div>
  )
};

const styles = {
  howToPlay: {
    textAlign: 'center',
    fontSize: '16px',
  },
  list: {
    paddingTop: 20,
    fontSize: '14px',
  },
  image: {
    maxWidth: 300,
    width: '100%',
  }
};

export default compose(
  withLocalize,
  injectSheet(styles),
  pure,
)(HowToPlay);

HowToPlay.defaultProps = {
};

HowToPlay.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
