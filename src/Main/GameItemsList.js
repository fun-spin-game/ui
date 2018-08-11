import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import injectSheet from 'react-jss';
import { isMobile } from 'react-device-detect';
import FlipMove from 'react-flip-move';
import classNames from 'classnames';
import { AutoSizer, WindowScroller, List } from 'react-virtualized';
import { compose, withState, withHandlers } from 'recompose';
import withMeta from '../containers/withMeta';
import withUser from '../containers/withUser';
import GameItem from './GameItem';
import { GAMES_AMOUNT } from '../config';
import Coins from '../common/Coins';
import { Slider } from 'antd';

const getGameItemGameProps = ({
  id,
  chanceToWin,
  prize,
  maxAttempts,
  connectedUser,
  creatorUser,
  won,
  lost,
  risk,
  userInfo,
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
  userInfo,
});

const FILTERS = new Array(GAMES_AMOUNT / 20)
  .fill()
  .map((o, index) => ({ min: index * 20 || 1, max: (index + 1) * 20 }));

const GameItemsList = ({ classes, sortGames, appInFocus, games, rangeFilter, sliderAfterChange, tipFormatter }) => {
  const filter = FILTERS[rangeFilter];
  const filteredGames = games.filter(o => o.prize >= filter.min && o.prize <= filter.max);
  const sortedFilteredGames = sortGames(filteredGames);
  const sortedGames = sortGames(games);
  return <Fragment>
    <div className={classes.filterLabel}>{filter.min} <Coins /> - {filter.max} <Coins /></div>
    {
      window.innerWidth > 600 ? (<Fragment>
        <Slider
          className={classNames(classes.slider, { mobile: isMobile }) }
          defaultValue={0}
          min={0}
          max={FILTERS.length - 1}
          onAfterChange={sliderAfterChange}
          tipFormatter={tipFormatter}
        />
        <div className={`${classes.gameItems}`}>
          <FlipMove leaveAnimation="accordionVertical" disableAllAnimations={!appInFocus || isMobile}>
            {
              sortedFilteredGames.map((game) => <div key={`GameItem${game.id}`}>
                <GameItem { ...getGameItemGameProps(game) } />
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
                  rowCount={sortedGames.length}
                  rowHeight={180}
                  scrollTop={scrollTop}
                  width={width}
                  rowRenderer={({ index, key, style }) => <div style={style} key={key}>
                    <GameItem { ...getGameItemGameProps(sortedGames[index]) } />
                  </div>}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )
    }
  </Fragment>
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
  withUser(),
  withMeta(),
  withState('rangeFilter', 'setRangeFilter', 0),
  withHandlers({
    sortGames: ({ userInfo: { balance }}) => (games) => _.sortBy(games, [({ risk }) => balance <= risk, 'prize']),
    sliderAfterChange: ({ setRangeFilter }) => (value) => { setRangeFilter(value) },
    tipFormatter: () => (value) => (<span>{FILTERS[value].min} <Coins /> - {FILTERS[value].max} <Coins /></span>)
  }),
  injectSheet(styles),
)(GameItemsList);

GameItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.array.isRequired,
  appInFocus: PropTypes.bool.isRequired,
  rangeFilter: PropTypes.number.isRequired,
  userInfo: PropTypes.object.isRequired,
  setRangeFilter: PropTypes.func.isRequired,
  sliderAfterChange: PropTypes.func.isRequired,
  sortGames: PropTypes.func.isRequired,
  tipFormatter: PropTypes.func.isRequired,
};
