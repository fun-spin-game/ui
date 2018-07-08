import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Slider from "react-slick";
import { Layout, Button, Icon } from 'antd';
import Content from '../Content';
import Header from '../Header';
import SideMenu from '../SideMenu';
import { greenColor, lightGreenColor } from '../variables';
import SliderItem from './SliderItem';


class Main extends Component {
  render() {
    const { classes } = this.props;

    const settings = {
      arrows: true,
      infinite: true,
      speed: 700,
      slidesToShow: 5,
      slidesToScroll: 1,
      draggable: true,
      swipeToSlide: true,
      swipe: true,
      centerMode: true,
      centerPadding: '60px',
      focusOnSelect: true
    };

    return (
      <Layout className="layout">
        <Header />
        <Layout>
          <SideMenu />
          <Content>
            <div className={`${classes.content} ${classes.sliderContainer}`}>
              <Slider {...settings}>
                {
                  [
                    {
                      prize: 20,
                      bid: 20,
                      percentage: 50,
                    },
                    {
                      prize: 100,
                      bid: 150,
                      percentage: 75,
                    },
                    {
                      prize: 5,
                      bid: 2,
                      percentage: 15,
                    },
                    {
                      prize: 20,
                      bid: 20,
                      percentage: 70,
                    },
                    {
                      prize: 100,
                      bid: 150,
                      percentage: 90,
                    },
                    {
                      prize: 5,
                      bid: 2,
                      percentage: 30,
                    },
                    {
                      prize: 20,
                      bid: 20,
                      percentage: 50,
                    },
                    {
                      prize: 100,
                      bid: 150,
                      percentage: 10,
                    },
                    {
                      prize: 5,
                      bid: 2,
                      percentage: 45,
                    }
                  ]
                  .map(({ prize, bid, percentage }, index) => {
                    return (
                      <SliderItem key={index} prize={prize} bid={bid} percentage={percentage} />
                    );
                  })
                }
              </Slider>
              <div className={classes.playButtonBlock}>
                <Icon type="caret-up" className={classes.playButtonArrow} />
                <div className={classes.playButtonContainer}>
                  <Button type="primary" size="large" className={classes.playButton}>Play!</Button>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const styles = {
  sliderContainer: {
    'padding-top': 50,
    '& .slick-center .slider-content': {
      transform: 'scale(1.3)',
    }
  },
  percentage: {
    'margin-bottom': '5px',
  },
  menuFirstItem: {
    'margin-top': '0 !important',
  },
  playButtonBlock: {
    display: 'flex',
    'justify-content': 'center',
    'flex-direction': 'column',
    'margin-top': '5px'
  },
  playButtonArrow: {
    'font-size': '50px',
    color: greenColor,
  },
  playButton: {
    background: greenColor,
    'border-color': greenColor,
    '&:hover, &:focus, &:active': {
      background: lightGreenColor,
      'border-color': lightGreenColor
    }
  },
  playButtonContainer: {
    'text-align': 'center'
  }
};

export default injectSheet(styles)(Main);

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};
