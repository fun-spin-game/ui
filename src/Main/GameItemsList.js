import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import injectSheet from 'react-jss';
import { isMobile } from 'react-device-detect';
import { withRouter } from 'react-router'
import FlipMove from 'react-flip-move';
import { AutoSizer, WindowScroller, List } from 'react-virtualized';
import { compose, withHandlers, lifecycle, pure, withProps } from 'recompose';
import withMeta from '../containers/withMeta';
import withUser from '../containers/withUser';
import withGameConfig from '../containers/withGameConfig';
import withTables from '../containers/withTables';
import GameItem from './GameItem';
import Spinner from '../common/Spinner';

const getGameItemGameProps = ({
  game: {
    id,
    chanceToWin,
    prize,
    maxAttempts,
    connectedUser,
    creatorUser,
    won,
    lost,
    risk,
  },
  userInfo: { id: userId, balance },
}) => ({
  id,
  chanceToWin,
  prize,
  maxAttempts,
  connectedUser,
  creatorUser,
  won,
  lost,
  risk,
  userId,
  balance,
});

const GameItemsList = ({
  classes,
  appInFocus,
  games,
  userInfo,
  sortedFilteredGames,
}) => {
  return <Spinner show={!games.length} overlay={true} transparentOverlay={true}>
    {
      window.innerWidth > 666 ? (<Fragment>
        <div className={`${classes.gameItems}`}>
          <FlipMove leaveAnimation="accordionVertical" disableAllAnimations={!appInFocus || isMobile}>
            {
              sortedFilteredGames.map((game) => <div key={`GameItem${game.id}`}>
                <GameItem { ...getGameItemGameProps({ game, userInfo }) } />
              </div>)
            }
          </FlipMove>
        </div>
      </Fragment>) : (
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight={true}>
              {({ width }) => (
                <List
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={sortedFilteredGames.length}
                  rowHeight={180}
                  scrollTop={scrollTop}
                  width={width}
                  rowRenderer={({ index, key, style }) => <div style={style} key={key}>
                    <GameItem
                      { ...getGameItemGameProps({ game: sortedFilteredGames[index], userInfo }) }
                      userId={userInfo.id}
                      balance={userInfo.balance}
                    />
                  </div>}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )
    }
  </Spinner>
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
  filterLabel: {
    textAlign: 'center',
    fontSize: '18px',
    marginTop: -5,
  },
  slider: {
    marginTop: 15,
    margin: '0 20px',
    '& .ant-slider-handle': {
      width: 30,
      height: 30,
      marginTop: -13,
      marginLeft: -14,
      borderWidth: 5,
    }
  }
};

export default compose(
  withRouter,
  withUser(),
  withGameConfig(),
  withMeta(),
  withTables(),
  withHandlers({
    sortGames: ({ userInfo: { balance }}) => (games) => _.sortBy(games, [({ risk, maxAttempts, won, lost }) => balance <= risk || won + lost >= maxAttempts, 'prize']),
  }),
  withProps(({ games, sortGames, match: { params: { tableId } } }) => {
    const filteredGames = games.filter(o => o.tableId === parseInt(tableId));
    const sortedFilteredGames = sortGames(filteredGames);
    return { sortedFilteredGames };
  }),
  lifecycle({
    componentDidMount() {
      window.scrollTo(0, 0);
    },
  }),
  injectSheet(styles),
  pure,
)(GameItemsList);

GameItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  appInFocus: PropTypes.bool.isRequired,
  userInfo: PropTypes.object.isRequired,
  gameConfig: PropTypes.object.isRequired,
  sortGames: PropTypes.func.isRequired,
  sortedFilteredGames: PropTypes.array.isRequired,
};
