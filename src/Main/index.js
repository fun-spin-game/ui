import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Icon } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose, withState, withHandlers, pure, } from 'recompose';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGamesActions from '../containers/withGamesActions';
import withUser from '../containers/withUser';
import withGames from '../containers/withGames';
import PageTitle from '../common/PageTitle';
import GameItemsList from './GameItemsList';

const Main = ({
  classes,
  createGame,
  createGameMode,
  handleSubmit,
  cancelCreateGame,
  translate,
  activeGame,
  games,
  userInfo: { createdGame },
}) => {
  return (
    <Fragment>
      <PageTitle>
        {translate('LOTS')}
        { !createdGame && <a className={classes.createGameBtn} onClick={createGame}><Icon size="large" type="plus-circle-o" /></a> }
      </PageTitle>
      <GameItemsList games={games} />
      <Game activeGame={activeGame} />
      <CreateGameForm
        visible={createGameMode}
        onCancel={cancelCreateGame}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  );
};

const styles = {
  gameItems: {
    '& > *': {
      display: 'flex',
      'flex-wrap': 'wrap',
      'justify-content': 'space-around',
    }
  },
  chanceToWin: {
    'margin-bottom': '5px',
  },
  menuFirstItem: {
    'margin-top': '0 !important',
  },
  title: {
    'text-align': 'center',
  },
  createGameBtn: {
    float: 'right',
    '@media(max-width: 666px)': {
      position: 'fixed',
      fontSize: 25,
      right: 8,
      top: 80,
      padding: '0 10px',
      zIndex: 10,
    }
  },
};

export default compose(
  withLocalize,
  injectSheet(styles),
  withUser(),
  withGamesActions(),
  withGames(),
  withState('createGameMode', 'setCreateGameMode', false),
  withHandlers({
    handleSubmit: ({ notifyCreateGame, setCreateGameMode }) => (values) => {
      notifyCreateGame({ game: values });
      setCreateGameMode(false);
    },
    createGame: ({ setCreateGameMode }) => () => {
      setCreateGameMode(true);
    },
    cancelCreateGame: ({ setCreateGameMode }) => () => {
      setCreateGameMode(false);
    },
  }),
  pure,
)(Main);

Main.defaultProps = {
  activeGame: null,
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  createGameMode: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  notifyCreateGame: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  setCreateGameMode: PropTypes.func.isRequired,
  cancelCreateGame: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  activeGame: PropTypes.object,
};
