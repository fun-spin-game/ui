import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Icon, Button, Modal } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose, withState, withHandlers, pure, lifecycle } from 'recompose';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGamesActions from '../containers/withGamesActions';
import withUser from '../containers/withUser';
import withGames from '../containers/withGames';
import withGameConfig from '../containers/withGameConfig';
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
    marginLeft: -28,
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
  withGameConfig(),
  lifecycle({
    componentDidMount() {
      const {
        userInfo,
        gameConfig: {
          REQUIRED_PAID_TO_WITHDRAW,
          START_USER_BALANCE,
        },
        translate,
        confirmDemoModeFinished,
        confirmDemoModeActivated,
      } = this.props;
      if (!userInfo) return;
      if (userInfo.paid >= REQUIRED_PAID_TO_WITHDRAW && !userInfo.demoModeFinishedConfirmation) {
        Modal.info({
          title: translate('DEMO_MODE_FINISHED'),
          content: `${translate('NOW_YOU_CAN_WITHDRAW_YOU_MANY')}. ${translate('EVERYTHING_THAT_YOU_EARN_IN_DEMO_MODE_WAS_DISCARDED')}`,
          onOk() {
            confirmDemoModeFinished();
          },
          footer: [
            <Button key="submit" type="primary" onClick={() => {
              confirmDemoModeFinished();
            }}>
              {translate('CONFIRM')}
            </Button>
          ]
        })
      }
      if (!userInfo.demoModeActivatedConfirmation) {
        Modal.info({
          title: `${translate('WELCOME')}!`,
          content: <div>
            - {translate('DEMO_MODE_ACTIVATED_YOU_RECEIVED_N_DOLLARS_AS_A_START_BONUS', { n: START_USER_BALANCE })}.<br/><br/>
            - {translate('WITHDRAW_MONEY_IN_DEMO_MODE_IS_IMPOSSIBLE')}.<br/><br/>
            - {translate('TO_END_UP_DEMO_MODE_YOU_SHOULD_TOP_UP_THE_BALANCE_FOR_N_DOLLARS', { n: REQUIRED_PAID_TO_WITHDRAW })}.<br/><br/><br/>
            {translate('HAVE_A_GOOD_GAME')}!
          </div>,
          onOk() {
            confirmDemoModeActivated()
          },
          footer: [
            <Button
              key="submit"
              type="primary"
            >
              {translate('OK')}
            </Button>
          ]
        })
      }
    }
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
