import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { withLocalize } from 'react-localize-redux';
import { pure, compose} from 'recompose';
import { Tabs } from 'antd';
import { lightGrayColor } from '../variables';

const TabPane = Tabs.TabPane;

const HOW_TO_PLAY = [
  {
    tabTitileKey: 'REGISTRATION',
    tabSteps: [
      {
        imageUrl: '/registration-screen.png',
        stepItemsKeys: [
          'Перейдите на страницу регистрации из главного меню, после чего, заполните простую форму, содержащую в себе 3 поля для ввода данных',
          'Поле "email" - адресс вашей электронной почты',
          'Поле "пароль" - придумайте пароль, который вы будете вводить при входе в игру',
          'Поле "повторите ваш пароль" - повторите придуманный вами пароль',
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
  {
    tabTitileKey: 'DEMO_MODE',
    tabSteps: [
      {
        imageUrl: '/demo-mode-activated.png',
        stepItemsKeys: [
          'После завершения регистрации вы будете перенаправлены на главную страницу, где увидите уведомление об активации демонстрационного режима',
          'При активации демонстрационного режима вы получаете стартовый бонус',
          'В демонстрационном режиме можно играть без пополнения счета, используя стартовый бонус',
          'В демонстрационном режиме невозможно выводить деньги',
        ]
      },
      {
        imageUrl: '/top-up-balance-screen.png',
        stepItemsKeys: [
          'Для завершения демонстрационного режима, вам необходимо пополнить свой счет на 5$',
          'Для этого перейдите на страницу пополнения счета из главного меню и совершите пополнение счета'
        ]
      },
      {
        imageUrl: '/demo-mode-finished.png',
        stepItemsKeys: [
          'После успешного пополнения счета, вы увидите уведомление о том, что демонстрационный режим деактивирован',
          'Ваш баланс станет равным сумме вашего пополнения',
          'Теперь вы можете выводить деньги!',
        ]
      },
    ],
  },
  {
    tabTitileKey: 'TOP_UP_THE_BALANCE',
    tabSteps: [
      {
        imageUrl: '/top-up-balance-screen.png',
        stepItemsKeys: [
          'Для пополнения счета перейдите на страницу пополнения из главного меню',
          'Укажите сумму пополнения перетянув ползунок либо введя сумму в соответствующее поле',

        ]
      },
      {
        imageUrl: '/free-kassa-1.png',
        stepItemsKeys: [
          'После того как вы указали сумму, нажмите кнопку "Пополнить" и вы будете пренаправлены на сайт партнера',
          'Веберете удобный для вас способ оплаты'
        ]
      },
      {
        imageUrl: '/free-kassa-2.png',
        stepItemsKeys: [
          'Далее, заполните необходимые поля и нажмите на кнопку "Оплатить"',
          'После этого, в зависимости от выбранного вами способа оплаты, вы будете перенаправлены на сайт оператора предоставляющего услугу оплаты',
        ]
      },
      {
        imageUrl: '/top-up-balance-screen.png',
        stepItemsKeys: [
          'После успешной олпаты выбудете перенаправлены на наш сайт, а ваш баланс будет пополнен на соответствующую сумму',
        ]
      },
    ],
  },
  {
    tabTitileKey: 'GAME_PROCESS',
    tabSteps: [
      {
        imageUrl: '/lots-screen.png',
        stepItemsKeys: [
          'Для того, чтобы начать играть - перейдите на страницу лотов из главного меню',
        ]
      },
      {
        imageUrl: '/lot.png',
        stepItemsKeys: [
          'У каждого лота есть несколько параметров',
          'Шанс выигрыша. Чем больше этот параметр, тем больше у вас шансов на победу!',
          'Приз. Это сумма, который вы получите в случае выигрыша',
          'Ваш риск. Это сумма, которую вы потеряете в случае проигрыша. Чем выше шанс на победу - тем больше ваш риск',
          'Количество использованых попыток в этом лоте. Когда этот параметры достигнет максимума - лот станет недоступным',
        ]
      },
      {
        imageUrl: '/lot-hover.png',
        stepItemsKeys: [
          'Когда вы нашли понравившийся вам лот - наведите на него мышкой и нажмите кнопку "Играть!"',
        ]
      },
      {
        imageUrl: '/gameplay-screen.png',
        stepItemsKeys: [
          'После этого вы увидите окно с лентой, состоящей из красных и зеленых ячеек',
          'Зеленая ячейка означает выигрыш',
          'Красная - проигрыш',
          'Нажмите кнопку "Играть" и лента начнет движение',
          'Ваш выигрыш либо проигрыш зависит от цвета ячейки, на которой остановится лента'
        ]
      },
    ],
  },
  {
    tabTitileKey: 'WITHDRAW',
    tabSteps: [
      {
        imageUrl: '/withdraw-screen.png',
        stepItemsKeys: [
          'Для вывода средств перейдите на соответсвующую страницу из главного меню',
          'Выберете сумму для вывода',
          'Выберете желаемый способ вывода',
          'Укажите номер вашего кошелька',
          'Нажмите на кнопку "Вывести"',
          'Ваша заявка будет обработана в течении суток и деньги поступят на ваш кошелек!'
        ]
      },
    ]
  }
];

const HowToPlay = ({ classes, translate }) => {
  return (
    <Tabs defaultActiveKey={HOW_TO_PLAY[0].tabTitileKey} className={classes.howToPlayTabs}>
      {
        HOW_TO_PLAY.map((tab)=> (
          <TabPane
            tab={translate(tab.tabTitileKey)}
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
                  <div className={classNames(classes.howToPlayImage, 'howToPlayImage')}>
                    <img src={step.imageUrl} />
                  </div>
                  <div className={classes.howToPlayText}>
                    <div className={classes.stepNumber}>Шаг {stepIndex + 1}</div>
                    {
                      step.stepItemsKeys.map(text => (
                        <div key={text}>- {text}</div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </TabPane>
        ))
      }
    </Tabs>
  );
};

const styles = {
  howToPlayTabs: {
    marginLeft: -20,
    marginRight: -20,
  },
  howToPlayImage: {
    maxWidth: 400,
    width: '100%',
    display: 'inline-block',
    marginBottom: 5,
    '& img': {
      boxShadow: '2px 2px 10px -3px rgba(0,0,0,0.3)',
      width: '100%',
    }
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
      marginLeft: 50,
    }
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  }
};

export default compose(
  injectSheet(styles),
  withLocalize,
  pure,

)(HowToPlay);

HowToPlay.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
