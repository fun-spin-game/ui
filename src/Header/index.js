import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout } from 'antd';
import { compose } from 'recompose';
import RightBlock from './RightBlock';

const { Header: HeaderAnt } = Layout;

const Header = ({ classes }) => {
  return (
    <HeaderAnt className={classes.header}>
      <div className={classes.logo} />
      <RightBlock />
    </HeaderAnt>
  );
}

const styles = {
  header: {
    overflow: 'auto',
    width: '100%',
    position: 'fixed',
    'z-index': 10,
    color: 'white',
  },
  logo: {
    float: 'left',
    width: '150px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
    'margin-left': '-25px',
  },
};

Header.defaultProps = {
  userData: null,
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(injectSheet(styles))(Header);
