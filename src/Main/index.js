import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Button } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose } from 'recompose';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';
import PageTitle from '../common/PageTitle';
import GameItemsList from './GameItemsList';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      createGameMode: false,
      filter: 0,
    };
  }
  toggleCreateGameModal(value) {
    this.setState({
      createGameMode: value,
    })
  }
  render() {
    const {
      classes,
      notifyCreateGame,
      translate,
    } = this.props;
    return (
      <Fragment>
        <PageTitle>{translate('LOTS')}</PageTitle>
        <GameItemsList />
        <div className={classes.createGameBlock}>
          <Button
            type="primary"
            onClick={() => this.toggleCreateGameModal(true)}
            className={classes.createGameBtn}
          >
            {translate('CREATE_LOT')}
          </Button>
        </div>
        <Game />
        <CreateGameForm
          visible={this.state.createGameMode}
          onCancel={() => this.toggleCreateGameModal(false)}
          handleSubmit={(values) => { notifyCreateGame({ game: values }); this.toggleCreateGameModal(false) }}
        />
      </Fragment>
    )
  }
}

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
  translate: PropTypes.func.isRequired,
  notifyCreateGame: PropTypes.func.isRequired,
};
