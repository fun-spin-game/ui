import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import injectSheet from 'react-jss'
import FlipMove from 'react-flip-move';
import { Layout, Button } from 'antd';
import { compose } from 'recompose';
import Content from '../Content';
import Header from '../Header';
import SideMenu from '../SideMenu';
import GameItem from './GameItem';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGames from '../redux/games/withGames';
import withUser from '../redux/user/withUser';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      collapsedSideMenu: true,
      createGameMode: false,
    };
  }
  onCollapseSideMenu() {
    this.setState({ collapsedSideMenu: !this.state.collapsedSideMenu });
  }
  toggleCreateGameModal(value) {
    this.setState({
      createGameMode: value,
    })
  }
  render() {
    const { classes, games, connectToGame, notifyCreateGame, getGamePlayer, userInfo: { balance } } = this.props;
    const { collapsedSideMenu } = this.state;
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
              <FlipMove leaveAnimation="accordionVertical">
                {
                  _.sortBy(games, [({ risk }) => balance <= risk, 'createdAt'])
                  .map(({ prize, risk, chanceToWin, maxAttempts, creatorUser, id: gameId }) => {
                    return (
                      <GameItem
                        id={gameId}
                        key={gameId}
                        prize={prize}
                        risk={risk}
                        creatorUser={creatorUser}
                        chanceToWin={chanceToWin}
                        maxAttempts={maxAttempts}
                        onClickPlay={connectToGame}
                        disabled={balance < risk}
                        gamePlayer={getGamePlayer({ gameId })}
                      />
                    );
                  })
                }
              </FlipMove>
            </div>
            <div className={classes.createGameBlock}>
              <Button type="primary" onClick={() => this.toggleCreateGameModal(true)} className={classes.createGameBtn}>Create lot</Button>
            </div>
            <Game />
            <CreateGameForm
              visible={this.state.createGameMode}
              onCancel={() => this.toggleCreateGameModal(false)}
                handleSubmit={(values) => { notifyCreateGame({ game: values }); this.toggleCreateGameModal(false) }}
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
  withUser(),
  withGames(),
)(Main);

Main.defaultProps = {
  activeGame: null,
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  connectToGame: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  getGamePlayer: PropTypes.func.isRequired,
  notifyCreateGame: PropTypes.func.isRequired,
};
