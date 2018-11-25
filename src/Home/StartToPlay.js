import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withLocalize } from 'react-localize-redux';
import classNames from 'classnames';
import { Button } from 'antd';
import { pure, compose } from 'recompose';
import { Link } from 'react-router-dom'

const StartToPlay = ({ classes, translate, ghostBtn }) => {
  return (
    <div className={classNames(classes.block, classes.startPlayBlock)}>

        <Link to="/login">
          <Button
            type="primary"
            className={classNames(classes.startPlayBtn, { ghostBtn })}
            size="large"
          >
            {translate('START_TO_PLAY')}!
          </Button>
        </Link>

    </div>
  );
};

const styles = {
  startPlayBlock: {
    textAlign: 'center',
    padding: '40px 0',
  }
};

export default compose(
  withLocalize,
  injectSheet(styles),
  pure
)(StartToPlay);

StartToPlay.defaultProps = {
  ghostBtn: false,
};
StartToPlay.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  ghostBtn: PropTypes.bool,
};
