import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import injectSheet from 'react-jss'
import { Translate } from 'react-localize-redux';
import { pure, compose } from 'recompose';

const Social = ({ classes }) => {
  const { REACT_APP_BASE_REST_URL } = process.env;
  return (
    <div className={classes.socialWrapper}>
      {<Translate id={'LOG_IN_WITH_SOCIAL_NETWORKS'} />}:
      <div className={classes.social}>
        <a href={`${REACT_APP_BASE_REST_URL}/auth/facebook`}>
          <Icon type="facebook" />
        </a>
        <a href={`${REACT_APP_BASE_REST_URL}/auth/twitter`}>
          <Icon type="twitter" />
        </a>
        <a href={`${REACT_APP_BASE_REST_URL}/auth/instagram`}>
          <Icon type="instagram" />
        </a>
        <a href={`${REACT_APP_BASE_REST_URL}/auth/google`}>
          <Icon type="google" />
        </a>
        <a href={`${REACT_APP_BASE_REST_URL}/auth/vkontakte`}>
          <b>VK</b>
        </a>
      </div>
    </div>
  );
}

const styles = {
  socialWrapper: {
    'margin-top': '15px',
  },
  social: {
    marginTop: 10,
    'padding-bottom': '15px',
    display: 'flex',
    'justify-content': 'space-between',
    'font-size': '25px',
  }
};

export default compose(injectSheet(styles), pure)(Social);

Social.propTypes = {
  classes: PropTypes.object.isRequired,
};
