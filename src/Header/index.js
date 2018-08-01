import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Select } from 'antd';
import Cookie from 'js-cookie'
import { withLocalize } from 'react-localize-redux';
import { compose } from 'recompose';
import RightBlock from './RightBlock';

const { Header: HeaderAnt } = Layout;
const Option = Select.Option;

const Header = ({ classes, languages, activeLanguage, setActiveLanguage }) => {
  return (
    <HeaderAnt className={classes.header}>
      <div className={classes.logo} />
      <div className={classes.headerContent}>
        <RightBlock />
        <Select
          className={classes.language}
          defaultValue={activeLanguage.code}
          onChange={(value) => {
            setActiveLanguage(value);
            Cookie.set('language', value);
          }}
        >
          {
            languages.map(({ code, label }) => (
              <Option key={`language-${code}`} value={code}>
                <span className={`flag-icon flag-icon-${code}`}></span> {label.toUpperCase()}
              </Option>
            ))
          }
       </Select>
     </div>
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
    display: 'flex',
    justifyContent: 'space-between'
  },
  logo: {
    width: '150px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
    'margin-left': '-25px',
  },
  headerContent: {
    display: 'flex'
  },
  language: {
    marginLeft: 20,
    width: 85,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& .ant-select-selection': {
      lineHeight: '64px',
      background: 'transparent',
      border: 'none',
      color: 'white',
    },
    '& .ant-select-arrow': {
      color: 'white',
    }
  }
};

Header.defaultProps = {
  userData: null,
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  setActiveLanguage: PropTypes.func.isRequired,
  activeLanguage: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
};

export default compose(
  withLocalize,
  injectSheet(styles),
)(Header);
