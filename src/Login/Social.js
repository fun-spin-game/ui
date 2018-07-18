import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import injectSheet from 'react-jss'

const Social = ({ classes }) => {
  const { REACT_APP_BASE_REST_URL } = process.env;
  return (
    <div className={classes.socialWrapper}>
      Sign In with social networks:
      <div className={classes.social}>
        <a href={`${REACT_APP_BASE_REST_URL}/auth/facebook`}>
          <Icon type="facebook" />
        </a>
        <a href="">
          <Icon type="twitter" />
        </a>
        <a href="">
          <Icon type="instagram" />
        </a>
        <a href="">
          <Icon type="google" />
        </a>
        <a href="">
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
    'padding-bottom': '15px',
    display: 'flex',
    'justify-content': 'space-between',
    'font-size': '25px',
  }
};

export default injectSheet(styles)(Social);

Social.propTypes = {
  classes: PropTypes.object.isRequired,
};
