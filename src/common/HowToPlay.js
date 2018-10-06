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
          'HOW_TO_PLAY_REGISTRATION_STEP_1_ITEM_1',
          'HOW_TO_PLAY_REGISTRATION_STEP_1_ITEM_2',
          'HOW_TO_PLAY_REGISTRATION_STEP_1_ITEM_3',
          'HOW_TO_PLAY_REGISTRATION_STEP_1_ITEM_4',
        ]
      },
      {
        imageUrl: '/demo-mode-activated.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_REGISTRATION_STEP_2_ITEM_1',
          'HOW_TO_PLAY_REGISTRATION_STEP_2_ITEM_2'
        ]
      },
    ],
  },
  // {
  //   tabTitileKey: 'DEMO_MODE',
  //   tabSteps: [
  //     {
  //       imageUrl: '/demo-mode-activated.png',
  //       stepItemsKeys: [
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_1_ITEM_1',
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_1_ITEM_2',
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_1_ITEM_3',
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_1_ITEM_4',
  //       ]
  //     },
  //     {
  //       imageUrl: '/top-up-balance-screen.png',
  //       stepItemsKeys: [
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_2_ITEM_1',
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_2_ITEM_2'
  //       ]
  //     },
  //     {
  //       imageUrl: '/demo-mode-finished.png',
  //       stepItemsKeys: [
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_3_ITEM_1',
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_3_ITEM_2',
  //         'HOW_TO_PLAY_DEMO_MODE_STEP_3_ITEM_3',
  //       ]
  //     },
  //   ],
  // },
  {
    tabTitileKey: 'TOP_UP_THE_BALANCE',
    tabSteps: [
      {
        imageUrl: '/top-up-balance-screen.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_1_ITEM_1',
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_1_ITEM_2',

        ]
      },
      {
        imageUrl: '/free-kassa-1.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_2_ITEM_1',
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_2_ITEM_2'
        ]
      },
      {
        imageUrl: '/free-kassa-2.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_3_ITEM_1',
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_3_ITEM_2',
        ]
      },
      {
        imageUrl: '/top-up-balance-screen.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_TOP_UP_THE_BALANCE_STEP_4_ITEM_1',
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
          'HOW_TO_PLAY_GAME_PROCESS_STEP_1_ITEM_1',
        ]
      },
      {
        imageUrl: '/lot.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_GAME_PROCESS_STEP_2_ITEM_1',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_2_ITEM_2',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_2_ITEM_3',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_2_ITEM_4',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_2_ITEM_5',
        ]
      },
      {
        imageUrl: '/lot-hover.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_GAME_PROCESS_STEP_3_ITEM_1',
        ]
      },
      {
        imageUrl: '/gameplay-screen.png',
        stepItemsKeys: [
          'HOW_TO_PLAY_GAME_PROCESS_STEP_4_ITEM_1',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_4_ITEM_2',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_4_ITEM_3',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_4_ITEM_4',
          'HOW_TO_PLAY_GAME_PROCESS_STEP_4_ITEM_5'
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
          'HOW_TO_PLAY_WITHDRAW_STEP_1_ITEM_1',
          'HOW_TO_PLAY_WITHDRAW_STEP_1_ITEM_2',
          'HOW_TO_PLAY_WITHDRAW_STEP_1_ITEM_3',
          'HOW_TO_PLAY_WITHDRAW_STEP_1_ITEM_4',
          'HOW_TO_PLAY_WITHDRAW_STEP_1_ITEM_5',
          'HOW_TO_PLAY_WITHDRAW_STEP_1_ITEM_6'
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
                    <div className={classes.stepNumber}>{translate('STEP')} {stepIndex + 1}</div>
                    {
                      step.stepItemsKeys.map(text => (
                        <div key={text}>- {translate(text)}</div>
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
    '@media(max-width: 800px)': {
      alignItems: 'center',
      flexDirection: 'column !important',
      marginTop: 0,
      '& .howToPlayImage': {
        marginLeft: '0 !important',
        marginRight: '0 !important',
        marginBottom: '40px !important'
      }
    },
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
