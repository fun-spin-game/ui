import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout } from 'antd';
import Content from '../Content';
import Header from '../Header';
import SideMenu from '../SideMenu';
import GameItem from './GameItem';
import Game from './Game';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      collapsedSideMenu: true,
    }
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
  render() {
    const { classes, games, activeGameId, actions } = this.props;
    const { collapsedSideMenu } = this.state;
    const activeGame = games.find(({ id }) => id === activeGameId);

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
              {
                games.map(({ prize, bid, percentage, maxAttempts, player, id: gameId }, index) => {
                  return (
                    <GameItem
                      id={index}
                      key={index}
                      prize={prize}
                      bid={bid}
                      percentage={percentage}
                      amountOfAttempts={this.getAmountOfAttempts({ gameId, actions })}
                      maxAttempts={maxAttempts}
                      player={player}
                    />
                  );
                })
              }
            </div>
            {
              activeGame && (
                <Game
                  activeGame={activeGame}
                  amountOfAttempts={this.getAmountOfAttempts({ gameId: activeGame.gameId, actions })}
                />
              )
            }
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const styles = {
  gameItems: {
    'padding-top': 50,
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'space-evenly',
  },
  percentage: {
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
  }
};

export default injectSheet(styles)(Main);

Main.defaultProps = {
  activeGameId: null,
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  activeGameId: PropTypes.number,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
};
