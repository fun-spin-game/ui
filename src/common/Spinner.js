import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import injectSheet from 'react-jss';
import {
  compose,
  withProps,
  pure,
} from 'recompose';
import Spinkit from 'react-spinkit';
import { blueColor } from '../variables';
import withSpinners from '../containers/withSpinners';

const SpinkitComp = ({ color, noFadeIn }) => <Spinkit name="ball-scale-ripple-multiple" color={color} noFadeIn={noFadeIn} />;

SpinkitComp.propTypes = {
  color: PropTypes.string.isRequired,
  noFadeIn: PropTypes.bool.isRequired,
};

const Spinner = ({ color, overlay, classes, noFadeIn, children, showSpinner }) => {
  return (<Fragment>
    {
      showSpinner && <Fragment>
        {
          overlay ?
            (<div className={classes.overlay}>
              <SpinkitComp noFadeIn={noFadeIn} color={color}/>
            </div>) :
            <div className={classes.spinnerWrapper}><SpinkitComp color={color} noFadeIn={noFadeIn}/></div>
        }
      </Fragment>
    }
    <div style={{ visibility: showSpinner ? 'hidden' : 'visible' }}>{children}</div>
  </Fragment>)
};

const styles = {
  '@keyframes pulseOverlay': {
    from: {
      backgroundColor: '#00000000',
    },
    to: {
      background: ({ transparentOverlay }) => transparentOverlay ? '#00000000' : '#000000c7',
    }
  },
  overlay: {
    position: ({ fixed }) => fixed ? 'fixed' : 'absolute',
    zIndex: 10,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: ({ transparentOverlay }) => transparentOverlay ? '#00000000' : '#000000c7',
    'color': 'gold',
  },
  spinnerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 25,
  }
};

export default compose(
  withSpinners(),
  withProps(
    ({ spinners, spinnerKey, show }) => {
      let showSpinner;
      if (show !== null && show !== undefined) return { showSpinner: show };

      if (!spinnerKey) return { showSpinner: true };

      const keyVal = _.get(spinners, spinnerKey);

      if (!_.isObject(keyVal)) return { showSpinner: keyVal };

      showSpinner = !!Object.values(keyVal).find((o) => o === true);

      return { showSpinner };
    },
  ),
  injectSheet(styles),
  pure,
)(Spinner);

Spinner.defaultProps = {
  overlayColor: null,
  color: blueColor,
  overlay: false,
  spinnerKey: null,
  children: null,
  show: null,
  noFadeIn: false,
  showSpinner: false,
  fixed: false,
};

Spinner.propTypes = {
  overlayColor: PropTypes.string,
  color: PropTypes.string,
  overlay: PropTypes.bool,
  showSpinner: PropTypes.bool,
  noFadeIn: PropTypes.bool,
  spinners: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  spinnerKey: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  fixed: PropTypes.bool,
};
