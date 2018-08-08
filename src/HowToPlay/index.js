import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';
import GameItem from "../Main/GameItem";

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
    risk={30}
    creatorUser={null}
    chanceToWin={50}
    maxAttempts={5}
    amountOfAttempts={2}
    onClickPlay={() => {}}
    disabled={false}
    gamePlayer={null}
  />
);

GameItemPreview.propTypes = {
  preview: PropTypes.bool.isRequired,
};

const HowToPlay = ({ classes, translate }) => {
  return (
    <div className={classes.howToPlay}>
      <PageTitle>{translate('HOW_TO_PLAY')}</PageTitle>
      <div>
        <p>- {translate('HOW_TO_PLAY_1')}</p>
        <p>- {translate('HOW_TO_PLAY_2')}:</p>
        <div className={classes.list}>
          <div>
            <div>1. {translate('HOW_TO_PLAY_2_1')}</div>
            <GameItemPreview preview="chanceToWin" />
          </div>
          <div>
            <div>2. {translate('HOW_TO_PLAY_2_2')}</div>
            <GameItemPreview preview="prize" />
          </div>
          <div>
            <div>3. {translate('HOW_TO_PLAY_2_3')}</div>
            <GameItemPreview preview="risk" />
          </div>
          <div>
            <div>4. {translate('HOW_TO_PLAY_2_4')}</div>
            <GameItemPreview preview="amountOfAttempts" />
          </div>
        </div>
        <div>
          <div>- {translate('HOW_TO_PLAY_3')}</div>
          <br/>
          <GameItemPreview preview="play" />
          <p></p>
        </div>
        <p>
          <span>
            {translate('HOW_TO_PLAY_4')}
          </span>
          <br/>
          <br/>
          <img src="/game.png" className={classes.image} alt="Game image" />
        </p>
        <p>
          <span>
            {translate('HOW_TO_PLAY_5')}
          </span>
          <br/>
          <br/>
          <img src="/create-game.png" className={classes.image} alt="Create game image" />
        </p>
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
)(HowToPlay);

HowToPlay.defaultProps = {
};

HowToPlay.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
