import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import injectSheet from 'react-jss'

class Social extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.socialWrapper}>
        Sign In with social networks:
        <div className={classes.social}>
          <a href="">
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
    )
  }
}

const styles = {
  socialWrapper: {
    'margin-top': '15px',
  },
  social: {
    'padding': '15px 0',
    display: 'flex',
    'justify-content': 'space-between',
    'font-size': '25px',
  }
};

export default injectSheet(styles)(Social);

Social.propTypes = {
  classes: PropTypes.object.isRequired,
};
