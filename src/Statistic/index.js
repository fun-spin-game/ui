import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, lifecycle, pure } from 'recompose';
import { List, Card, Avatar } from 'antd';
import { withLocalize } from 'react-localize-redux';
import withStatistic from '../containers/withStatistic';
import Coins from '../common/Coins';
import PageTitle from '../common/PageTitle';
import Spinner from '../common/Spinner';

const Statistic = ({ classes, top, translate }) => {
  return (
    <div className={classes.statistic}>
      <PageTitle>{translate('STATISTIC')}</PageTitle>
      <Spinner spinnerKey="REST_API.GET_STATISTIC_REQUEST" overlay={true} transparentOverlay={true}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
          dataSource={top}
          renderItem={({ displayName, balance, photo }, index) => (
            <List.Item>
              <Card title={`#${index + 1}`}>
                <div className={classes.card}>
                  <Avatar icon="user" src={photo} className={classes.avatar} size="large" />
                  <div>
                    <p>{displayName}</p>
                    <span>{Math.floor(balance / 100) * 100}+ <Coins /></span>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Spinner>
  </div>
  )
};

const styles = {
  statistic: {
    '& .ant-card-body': {
      paddingLeft: 15,
    }
  },
  card: {
    display: 'flex',
    height: 80,
  },
  avatar: {
    marginRight: 15,
  }
};

export default compose(
  withLocalize,
  withStatistic(),
  lifecycle({
    componentDidMount () {
      this.props.getStatistic();
    },
  }),
  injectSheet(styles),
  pure,
)(Statistic);

Statistic.defaultProps = {
};

Statistic.propTypes = {
  top: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
