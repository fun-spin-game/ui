import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import injectSheet from 'react-jss'

const { Content: ContentAnt } = Layout;

class Content extends Component {
  render() {
    const { classes, className } = this.props;
    return (
      <ContentAnt className={`${classes.contentWrapper} ${className}`}>
        <div className={classes.content}>
          {this.props.children}
        </div>
      </ContentAnt>
    )
  }
}

const styles = {
  contentWrapper: {
    '@media (min-width: 400px)': {
      padding: '0 50px',
    }
  },
  content: {
    background: '#fff',
    padding: 20,
    minHeight: '100vh',
    width: '100%'
  }
};

export default injectSheet(styles)(Content);

Content.defaultProps = {
  className: '',
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};
