import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, branch, renderComponent, withHandlers } from 'recompose';
import { Icon, Avatar } from 'antd';
import withUser from '../redux/user/withUser';
import Coins from '../common/Coins';
import { toFixedIfNeed } from '../helpers/gameUtils';

const RightBlock = ({ classes, logout, userInfo }) => {
  return (
    <div className={classes.rightBlock}>
      <span className={classes.balance}>
        Balance:
        <span className={classes.balanceAmount}>
          <Coins /> {toFixedIfNeed(userInfo.balance)} <a>
          <Icon type="plus-circle-o" />
          </a>
        </span>
      </span>

      <span className={classes.userName}>{userInfo.displayName || userInfo.email}</span>
      { userInfo.photo && <Avatar size="small" className={`${classes.playerAvatar}`} src={userInfo.photo} /> }
      <Icon type="logout" className={classes.logOut} onClick={logout} />
    </div>
  )
}

const styles = {
  logOut: {
    'font-size': '25px',
    'cursor': 'pointer',
    'vertical-align': 'sub',
    'padding-left': '10px'
  },
  rightBlock: {
    float: 'right'
  },
  userName: {
    'padding-left': '50px',
  },
  balanceAmount: {
    'font-size': '20px',
    'margin-left': '10px'
  },
  playerAvatar: {
    verticalAlign: -6,
    marginLeft: 15,
  }
};

RightBlock.defaultProps = {
  userData: null,
};

RightBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default compose(
  injectSheet(styles),
  withUser(),
  branch(
    ({ userInfo }) => !userInfo,
    renderComponent(() => null)
  ),
  withHandlers({
    logout: ({ logout }) => () => {
      logout();
    }
  })
)(RightBlock);
