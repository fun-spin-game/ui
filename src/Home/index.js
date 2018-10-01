import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { Row, Col, Button, Tabs } from 'antd';
import Particles from 'react-particles-js';
import { compose, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import { blueColor, lightGrayColor, darkColor } from '../variables';
import particles from './particles';

const TabPane = Tabs.TabPane;

const ADVANTAGES = [
  {
    textKey: 'В отличае от других, подобных игр, вы сами можете контролировать свой шанс на победу!',
    iconClass: 'fas fa-dice',
  },
  {
    textKey: 'Если вы обладаете выдержкой и терпением - вы можете иметь хороший и стабильный доход, превышающий стандартную зарплату в странах СНГ!',
    iconClass: 'fas fa-hand-holding-usd',
  },
  {
    textKey: 'Все честно! В наших интересах привлечь новых игроков, дав им реальную возможность зароботка, без обмана. В свою очередь мы берем небольшую комиссию в при каждом выводе средств.',
    iconClass: 'fas fa-heart',
  }
];

const ACHIEVEMENTS = [
  {
    textKey: 'выплачено игокам за все время',
    unitKey: '$',
    iconClass: 'fas fa-hand-holding-usd',
  },
  {
    textKey: 'каждый день получают свою первую выплату',
    unitKey: 'новых игроков',
    iconClass: 'fas fas fa-money-bill',
  },
  {
    textKey: 'онлайн в среднем за день',
    unitKey: 'человек',
    iconClass: 'fas fas fa-users',
  },
];

const HOW_TO_PLAY = [
  {
    tabTitileKey: 'Регистрация',
    tabSteps: [
      {
        imageUrl: '/registration-screen.png',
        stepItemsKeys: [
          'Перейдите на страницу регистрации из главного меню, после чего, заполните простую форму, содержащую в себе 3 поля для ввода данных:',
          '- Поле "email" - адресс вашей электронной почты',
          '- Поле "пароль" - придумайте пароль, который вы будете вводить при входе в игру',
          '- Поле "повторите ваш пароль" - повторите придуманный вами пароль',
        ]
      },
      {
        imageUrl: '/demo-mode-activated.png',
        stepItemsKeys: [
          'После заполнения всех полей нажмите кнопку "Регистрация".',
          'Регистрация будет завершена и вы будете перенаправлены на главную страницу, где увидите уведомление об активации демонстрационного режима'
        ]
      },
    ],
  },
];

const Home = ({ classes, translate }) => {
  return (
    <div className={classes.home}>
      <Particles
        width="100%"
        height="100%"
        style={{
          left: 0,
          top: 0,
          right: 0,
          position: 'absolute',
        }}
        params={particles()}
      />
      <h1 className={classes.title}>FunSpin</h1>
      <div className={classNames(classes.block, classes.advantagesBlock)}>
        <h2>{translate('MANAGE_LUCK_AND_EARN_MONEY')}!</h2>
        <Row gutter={16}>
          <Col span={12}>
            <div className={classes.advantages}>
              <h2>Особенности:</h2>
              <div className={classes.advantagesList}>
                {
                  ADVANTAGES.map(o => (
                    <div key={o.textKey} className={classes.advantagesItem}>
                      <i className={classNames(o.iconClass, classes.advantageIcon)}></i>
                      <div className={classes.advantageText}>{o.textKey}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </Col>
          <Col span={12}>
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
            >
            </iframe>
          </Col>
        </Row>
      </div>
      <div className={classNames(classes.block, classes.startPlayBlock)}>
        <Button type="primary" className={classes.startPlayBtn} size="large">Начать играть!</Button>
      </div>
      <div className={classNames(classes.block, classes.achievementsBlock)}>
        <h2>Наши достижения:</h2>
        <div className={classes.achievementsList}>
          {
            ACHIEVEMENTS.map(o => (
              <div key={o.textKey} className={classes.achievementsItem}>
                <i className={classNames(o.iconClass, classes.achievementIcon)}></i>
                <div className={classes.achievementText}>
                  56213 <span className={classes.achievementUnit}>{o.unitKey}</span>
                </div>
                <div className={classes.achievementDescription}>{o.textKey}</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className={classNames(classes.block, classes.howToPlayBlock)}>
        <h2>Как играть:</h2>
        <Tabs defaultActiveKey={HOW_TO_PLAY[0].tabTitileKey} className={classes.howToPlayTabs}>
          {
            HOW_TO_PLAY.map((tab)=> (
              <TabPane
                tab={tab.tabTitileKey}
                key={tab.tabTitileKey}
                className={classes.howToPlayTab}
              >
                {
                  tab.tabSteps.map((step, stepIndex) => (
                    <div
                      key={`step${stepIndex}`}
                      className={classNames(
                        classes.howToPlayStep,
                        {
                          [classes.stepOdd]: stepIndex % 2 === 0,
                          [classes.stepEven]: stepIndex % 2 !== 0,
                        }
                      )}
                    >
                      <div>
                        <img src={step.imageUrl} className={classNames(classes.howToPlayImage, 'howToPlayImage')} />
                      </div>
                      <div className={classes.howToPlayText}>
                        <div className={classes.stepNumber}>Шаг {stepIndex + 1}</div>
                        {
                          step.stepItemsKeys.map(text => (
                            <div key={text}>{text}</div>
                          ))
                        }
                      </div>
                    </div>
                  ))
                }
              </TabPane>
            ))
          }
          <TabPane tab="Игровой процесс" key="2">
          </TabPane>
          <TabPane tab="Пополнение счета" key="3">Content of Tab Pane 3</TabPane>
          <TabPane tab="Вывод средств" key="4">Content of Tab Pane 3</TabPane>
        </Tabs>
      </div>
      <div className={classNames(classes.block, classes.startPlayBlock)}>
        <Button type="primary" size="large">Начать играть!</Button>
      </div>
    </div>
  )
};

const styles = {
  home: {
    textAlign: 'center',
    fontSize: '16px',
  },
  title: {
    fontFamily: 'Satisfy',
    fontWeight: 'bold',
    fontSize: 90,
    color: blueColor,
    position: 'relative',
  },
  block: {
    position: 'relative',
    margin: '0 -20px',
    padding: '40px 20px',
    '& > h2': {
      marginBottom: 50,
    }
  },
  startPlayBlock: {
    textAlign: 'center',
  },
  startPlayBtn: {

  },
  advantagesList: {
    textAlign: 'left',
    fontStyle: 'italic',
    fontSize: 14,
  },
  advantageIcon: {
    color: blueColor,
    position: 'absolute',
    fontSize: 30,
  },
  advantageText: {
    paddingLeft: 60,
  },
  advantagesItem: {
    marginBottom: 20,
  },
  advantagesBlock: {
    background: lightGrayColor,
  },
  achievementsBlock: {
    textAlign: 'center',
    background: darkColor,
    color: 'white',
    '& > h2': {
      color: 'white',
    },
  },
  achievementsList: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  achievementsItem: {
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 40,
  },
  achievementText: {
    marginTop: 10,
    fontSize: 22,
  },
  achievementDescription: {
    fontSize: 10,
    marginTop: 5,
    maxWidth: 150
  },
  achievementUnit: {
    fontSize: 16,
  },
  howToPlayBlock: {
    background: 'white',
    paddingBottom: 0,
  },
  howToPlayTabs: {
    marginLeft: -20,
    marginRight: -20,
  },
  howToPlayImage: {
    maxWidth: 400,
    display: 'inline-block',
    marginBottom: 5,
    boxShadow: '2px 2px 10px -3px rgba(0,0,0,0.3)',
  },
  howToPlayStep: {
    display: 'flex',
    marginTop: 50,
    padding: '50px 20px',
  },
  howToPlayText: {
    textAlign: 'left'
  },
  stepOdd: {
    flexDirection: 'row',
    '& .howToPlayImage': {
      marginRight: 50,
    }
  },
  stepEven: {
    flexDirection: 'row-reverse',
    background: lightGrayColor,
    '& .howToPlayImage': {
      marginLight: 50,
    }
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 20,
  }
};

export default compose(
  withLocalize,
  injectSheet(styles),
  pure,
)(Home);

Home.defaultProps = {
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
