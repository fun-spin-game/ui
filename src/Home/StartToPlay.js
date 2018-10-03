import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { withLocalize } from 'react-localize-redux';
import classNames from 'classnames';
import { Button } from 'antd';
import { pure, compose } from 'recompose';


const StartToPlay = ({ classes, translate }) => {
  return (
    <div className={classNames(classes.block, classes.startPlayBlock)}>
      <Button type="primary" className={classes.startPlayBtn} size="large">{translate('START_TO_PLAY')}!</Button>
    </div>
  );
};

const styles = {
  startPlayBlock: {
    textAlign: 'center',
    padding: '40px 0',
  },
  startPlayBtn: {

  },
};

export default compose(
  withLocalize,
  injectSheet(styles),
  pure
)(StartToPlay);

StartToPlay.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
