import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout } from 'antd';
import Content from '../Content';
import Header from '../Header';
import SideMenu from '../SideMenu';
import GameItem from './GameItem';

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
  getGameItemResponse({ relatedActions, gameUserId }) {
    return relatedActions.find(relatedAction2 => {
      return relatedAction2.action === 'GAME_ITEM_RESPONSE' &&
      relatedAction2.gameUser.id === gameUserId
    })
  }
  isInProgress({ relatedActions }) {
    return !!relatedActions.find(relatedAction => {
      return relatedAction.action === 'GAME_ITEM_REQUEST' &&
      !this.getGameItemResponse({ relatedActions, gameUserId: relatedAction.gameUser.id });
    });
  }
  getAmountOfTries({ relatedActions }) {
    return relatedActions.filter(relatedAction => {
      return !!this.getGameItemResponse({ relatedActions, gameUserId: relatedAction.gameUser.id });
    }).length / 2
  }
  render() {
    const { classes } = this.props;
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
              {
                [
                  {
                    prize: 20,
                    bid: 20,
                    percentage: 50,
                    tries: 7,
                    maxTries: 10,
                  },
                  {
                    prize: 100,
                    bid: 150,
                    percentage: 75,
                    tries: 2,
                    maxTries: 10,
                    player: {

                    }
                  },
                  {
                    prize: 5,
                    bid: 2,
                    percentage: 15,
                    tries: 6,
                    maxTries: 10,
                  },
                  {
                    prize: 20,
                    bid: 20,
                    percentage: 70,
                    tries: 3,
                    maxTries: 10,
                  },
                  {
                    prize: 100,
                    bid: 150,
                    percentage: 90,
                    tries: 2,
                    maxTries: 10,
                  },
                  {
                    prize: 5,
                    bid: 2,
                    percentage: 30,
                    tries: 0,
                    maxTries: 10,
                  },
                  {
                    prize: 20,
                    bid: 20,
                    percentage: 50,
                    tries: 9,
                    maxTries: 10,
                  },
                  {
                    prize: 100,
                    bid: 150,
                    percentage: 10,
                    tries: 2,
                    maxTries: 10,
                  },
                  {
                    prize: 5,
                    bid: 2,
                    percentage: 45,
                    tries: 4,
                    maxTries: 10,
                  }
                ]
                .map(({ prize, bid, percentage, tries, maxTries, player }, index) => {
                  return (
                    <GameItem
                      id={index}
                      key={index}
                      prize={prize}
                      bid={bid}
                      percentage={percentage}
                      tries={tries}
                      maxTries={maxTries}
                      player={player}
                    />
                  );
                })
              }
            </div>
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

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
