import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, lifecycle } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';

const Contacts = ({ classes, translate }) => {
  return (
    <div className={classes.contacts}>
      <PageTitle>{translate('CONTACTS')}</PageTitle>
      <div>{translate('CONTACTS_TEXT')}</div>
  </div>
  )
};

const styles = {
  contacts: {
    textAlign: 'center',
  },
};

export default compose(
  withLocalize,
  injectSheet(styles),
)(Contacts);

Contacts.defaultProps = {
};

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
