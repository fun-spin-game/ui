import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout } from 'antd';
import Header from '../Header';
import SignIn from './SignIn';
import Content from '../Content';

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout className="layout">
        <Header />
        <Content>
          <div className={classes.content}>
            <SignIn />
          </div>
        </Content>
      </Layout>
    )
  }
}

const styles = {
  content: {
    display: 'flex',
    'justify-content': 'center'
  },
};

export default injectSheet(styles)(Home);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
