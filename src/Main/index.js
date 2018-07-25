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
import withUser from '../redux/user/withUser';

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
  toggleCreateGameModal(value) {
    this.setState({
      createGameMode: value,
    })
  }
  render() {
    const { classes, games, connectToGame, isGameInProgress, userInfo: { balance } } = this.props;
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
              <ReactCSSTransitionGroup
                transitionName="list"
                transitionEnterTimeout={500}
                transitionLeave={false}
              >
                {
                  games
                  .sort((a, b) => {
                    const disabledA = balance < a.risk;
                    const disabledB = balance < b.risk;
                    if (disabledA !==  disabledB) {
                      return disabledA ? 1 : -1;
                    }
                    if (a.createdAt < b.createdAt) {
                      return -1;
                    } else if (a.createdAt > b.createdAt) {
                      return 1;
                    }
                    return 0;
                  })
                  .map(({ prize, risk, chanceToWin, maxAttempts, id: gameId }, index) => {
                    return (
                      <GameItem
                        id={gameId}
                        key={index}
                        prize={prize}
                        risk={risk}
                        chanceToWin={chanceToWin}
                        maxAttempts={maxAttempts}
                        onClickPlay={connectToGame}
                        disabled={balance < risk}
                        inProgress={isGameInProgress({ gameId })}
                      />
                    );
                  })
                }
              </ReactCSSTransitionGroup>
            </div>
            <div className={classes.createGameBlock}>
              <Button type="primary" onClick={() => this.toggleCreateGameModal(true)} className={classes.createGameBtn}>Create lot</Button>
            </div>
            <Game />
            <CreateGameForm
              visible={this.state.createGameMode}
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
  isGameInProgress: PropTypes.func.isRequired,
};
