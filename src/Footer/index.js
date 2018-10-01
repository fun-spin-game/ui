import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Select } from 'antd';
import Cookie from 'js-cookie'
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';

const { Footer: FooterAnt } = Layout;
const Option = Select.Option;

const Footer = ({ classes, languages, activeLanguage, setActiveLanguage }) => {
  return (
    <FooterAnt className={classes.footer}>
      <div className={classes.logos}>
      </div>
      <div>© 2018 fun-spin.com</div>
      <div>
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
    </FooterAnt>
  );
}

const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media(max-width: 666px)': {
      textAlign: 'center',
      padding: '15px 50px 10px',
      flexDirection: 'column',
    }
  },
  language: {
    marginLeft: 20,
    width: 100,
    '@media(max-width: 666px)': {
      marginTop: 10,
    },
    '& .ant-select-selection': {
      lineHeight: '64px',
      background: 'transparent',
      border: 'none',
    },
    '& .ant-select-arrow': {
    }
  },
  logos: {
    width: 100,
    '@media(max-width: 666px)': {
      display: 'none',
    }
  }
};

Footer.defaultProps = {
  userData: null,
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  setActiveLanguage: PropTypes.func.isRequired,
  activeLanguage: PropTypes.object.isRequired,
  languages: PropTypes.array.isRequired,
};

export default compose(
  withLocalize,
  injectSheet(styles),
  pure,
)(Footer);
