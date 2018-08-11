import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from 'antd';
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
}) => {
  return (
    <Fragment>
      <PageTitle>{translate('LOTS')}</PageTitle>
      <GameItemsList games={games} />
      <div className={classes.createGameBlock}>
        <Button
          type="primary"
          onClick={createGame}
          className={classes.createGameBtn}
        >
          {translate('CREATE_LOT')}
        </Button>
      </div>
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
  createGameBlock: {
    'text-align': 'center',
    padding: '25px 0',
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
