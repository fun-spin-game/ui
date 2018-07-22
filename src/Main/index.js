import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Button } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { compose } from 'recompose';
import Content from '../Content';
import Header from '../Header';
import SideMenu from '../SideMenu';
import GameItem from './GameItem';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGames from '../redux/games/withGames';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      collapsedSideMenu: true,
      createGameMode: false,
    };
  }
  componentDidUpdate() {
    // TODO: Move to redux
    // const activeGame = this.getActiveGame({ games: this.props.games, activeGameId: this.props.activeGameId });
    // if (
    //   prevProps.activeGameId &&
    //   this.props.activeGameId &&
    //   prevProps.activeGameId  === this.props.activeGameId &&
    //   prevProps.balance >= activeGame.bid &&
    //   prevProps.balance < activeGame.bid
    // ) {
    //   notification.open({
    //     message: 'Low balance',
    //     description: <span>Game was closed due to the low coin balance. <a>By coins</a></span>,
    //   });
    // }
  }
  onCollapseSideMenu() {
    this.setState({ collapsedSideMenu: !this.state.collapsedSideMenu });
  }
  getGameItemResponse({ requestGameActionId, actions }) {
    return actions.find(targetAction => {
      return targetAction.action === 'GAME_SPIN_RESPONSE' &&
      targetAction.payload.requestGameActionId === requestGameActionId
    })
  }
  isInProgress({ actions, gameId }) {
    return !!actions.find(action => {
      return action.action === 'GAME_SPIN_REQUEST' &&
      gameId === action.gameId &&
      !this.getGameItemResponse({ actions, requestGameActionId: action.id });
    });
  }
  getAmountOfAttempts({ gameId, actions }) {
    return actions.filter(action => {
      return action.gameId === gameId &&
      action.action === 'GAME_SPIN_REQUEST' &&
      !!this.getGameItemResponse({ actions, requestGameActionId: action.id });
    }).length
  }
  getActiveGame({ games, activeGameId }) {
    return games.find(({ id }) => id === activeGameId);
  }
  createGame() {

  }
  toggleCreateGameModal(value) {
    this.setState({
      createGameMode: value,
    })
  }
  render() {
    const { classes, games, activeGameId, actions } = this.props;
    const { collapsedSideMenu } = this.state;
    const activeGame = this.getActiveGame({ games, activeGameId });

    return (
      <Layout className="layout">
        <SideMenu
          className={classes.sideMenu}
          collapsed={collapsedSideMenu}
          onCollapse={() => { this.onCollapseSideMenu() }}
        />
        <Layout>
          <Header />
          <Content className={`${classes.content} ${collapsedSideMenu ? 'collapsed-mode': ''}`}>
            <h1 className={classes.title}>Lots:</h1>
            <div className={`${classes.gameItems}`}>
              <ReactCSSTransitionGroup
                transitionName="list"
                transitionEnterTimeout={500}
                transitionLeave={false}
              >
                {
                  games.map(({ prize, bid, chanceToWin, maxAttempts, player, id: gameId }, index) => {
                    return (
                      <GameItem
                        id={index}
                        key={index}
                        prize={prize}
                        bid={bid}
                        chanceToWin={chanceToWin}
                        amountOfAttempts={this.getAmountOfAttempts({ gameId, actions })}
                        maxAttempts={maxAttempts}
                        player={player}
                      />
                    );
                  })
                }
              </ReactCSSTransitionGroup>
            </div>
            <div className={classes.createGameBlock}>
              <Button type="primary" onClick={() => this.toggleCreateGameModal(true)} className={classes.createGameBtn}>Create lot</Button>
            </div>
            {
              activeGame && (
                <Game
                  activeGame={activeGame}
                  amountOfAttempts={this.getAmountOfAttempts({ gameId: activeGame.gameId, actions })}
                />
              )
            }
            <CreateGameForm
              visible={this.state.createGameMode}
              wrappedComponentRef={(createGameForm) => this.createGameForm = createGameForm}
              balance={100}
              onCancel={() => this.toggleCreateGameModal(false)}
              handleSubmit={() => this.toggleCreateGameModal(false)}
            />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const styles = {
  gameItems: {
    '& > *': {
      'padding-top': 50,
      display: 'flex',
      'flex-wrap': 'wrap',
      'justify-content': 'space-evenly',
    }
  },
  chanceToWin: {
    'margin-bottom': '5px',
  },
  menuFirstItem: {
    'margin-top': '0 !important',
  },
  content: {
    'margin-left': 200,
    'margin-top': 64,
    transition: 'all .2s',
    '&.collapsed-mode': {
      'margin-left': 80,
    },
  },
  sideMenu: {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 64,
  },
  title: {
    'text-align': 'center',
  },
  createGameBlock: {
    'text-align': 'center',
    padding: '25px 0',
  }
};

export default compose(
  injectSheet(styles),
  withGames()
)(Main);

Main.defaultProps = {
  activeGameId: null,
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  activeGameId: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
};
