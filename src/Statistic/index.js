import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, lifecycle } from 'recompose';
import { List, Card, Avatar } from 'antd';
import withStatistic from '../containers/withStatistic';
import Coins from '../common/Coins';

const Statistic = ({ classes, top }) => {
  return (
    <div className={classes.statistic}>
      <h1 className={classes.title}>Top 50:</h1>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
        dataSource={top}
        renderItem={({ displayName, balance, photo }, index) => (
          <List.Item>
            <Card title={`#${index + 1}`}>
              <div className={classes.card}>
                <Avatar src={photo} className={classes.avatar} size="large" />
                <div>
                  <p>{displayName}</p>
                  <span>{Math.floor(balance / 100) * 100}+ <Coins /></span>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />
  </div>
  )
};

const styles = {
  statistic: {
    '& .ant-card-body': {
      paddingLeft: 15,
    }
  },
  title: {
    'text-align': 'center',
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
  withStatistic(),
  lifecycle({
    componentDidMount () {
      this.props.getStatistic();
    },
  }),
  injectSheet(styles),
)(Statistic);

Statistic.defaultProps = {
};

Statistic.propTypes = {
  top: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};
