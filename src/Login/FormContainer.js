import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, pure } from 'recompose';

const FormContainer = ({ children , classes}) => {
    return (
      <div className={classes.form}>
        {children}
      </div>
    )
}

const styles = {
  form: {
    'width': '250px',
    '& button': {
      width: '100%',
    }
  },
};

export default compose(injectSheet(styles), pure)(FormContainer);

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
