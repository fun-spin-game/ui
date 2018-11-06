import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState, pure } from 'recompose';
import { Slider, Row, Col, InputNumber, Alert, Form, Modal } from 'antd';
import injectSheet from 'react-jss'
import { withLocalize } from 'react-localize-redux';
import Coins from '../common/Coins'
import { redColor } from '../variables'
import { getRisk, toFixedIfNeed } from '../helpers/gameUtils'
import withUser from '../containers/withUser';
import withGameConfig from '../containers/withGameConfig';

const FormItem = Form.Item;

const COL_LEFT = 11;
const COL_RIGHT = 13;

const CreateGameForm = ({
  classes,
  userInfo: { balance },
  handleSubmit,
  visible,
  onCancel,
  translate,
  setChanceToWin,
  setPrize,
  prizeTipFormatter,
  chanceTipFormatter,
  prize,
  chanceToWin,
  maxAttempts,
  getCreatorRisk,
  form: { getFieldDecorator },
  gameConfig: { GAME_MIN_PRIZE, GAME_MAX_PRIZE, MIN_CHANCE_TO_WIN, MAX_CHANCE_TO_WIN, MAX_ATTEMPTS }
}) => {
  const creatorRisk = getCreatorRisk({ prize, maxAttempts });
  const notEnoughCoins = creatorRisk > balance;
  return (
    <Modal
      title={translate('NEW_LOT')}
      visible={visible}
      okButtonProps={{ disabled: notEnoughCoins }}
      onOk={() => handleSubmit({ prize, chanceToWin, maxAttempts })}
      onCancel={onCancel}
      className={classes.modal}
      okText={'Create'}
    >
      <Form id="createGame" className={classes.createGame}>
        <FormItem>
          {getFieldDecorator('prize')(
            <div>
              <div className={classes.label}>{translate('PRIZE')}:</div>
              <Row>
                <Col span={COL_LEFT}>
                  <InputNumber
                    min={GAME_MIN_PRIZE}
                    max={GAME_MAX_PRIZE}
                    onChange={setPrize}
                    value={prize}
                  /> <Coins />
                </Col>
                <Col span={COL_RIGHT}>
                  <Slider
                    min={GAME_MIN_PRIZE}
                    max={GAME_MAX_PRIZE}
                    tipFormatter={prizeTipFormatter}
                    defaultValue={50}
                    onChange={setPrize}
                    value={prize}
                  />
                </Col>
              </Row>
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('chanceToWin')(
            <div>
              <div className={classes.label}>{translate('CHANCE_OF_WINNING')}:</div>
              <Row>
                <Col span={COL_LEFT}>
                  <InputNumber
                    min={MIN_CHANCE_TO_WIN}
                    max={MAX_CHANCE_TO_WIN}
                    value={chanceToWin}
                    onChange={setChanceToWin}
                  /> <span>%</span>
                </Col>
                <Col span={COL_RIGHT}>
                  <Slider
                    min={MIN_CHANCE_TO_WIN}
                    max={MAX_CHANCE_TO_WIN}
                    defaultValue={50}
                    tipFormatter={chanceTipFormatter}
                    onChange={setChanceToWin}
                    value={chanceToWin}
                  />
                </Col>
              </Row>
            </div>
          )}
        </FormItem>
        <FormItem>
          <div>
            <div className={classes.label}>{translate('ATTEMPTS_AMOUNT')}: {MAX_ATTEMPTS}</div>
          </div>
        </FormItem>
        <FormItem>
          {getFieldDecorator('youCanWin')(
            <div>
              <Row>
                <Col span={12}>
                  <div className={classes.label}>{translate('YOU_CAN_WIN')}: {toFixedIfNeed(getRisk({ prize, chanceToWin }) * maxAttempts)} <Coins /></div>
                </Col>
              </Row>
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('risk')(
            <div>
              <Row>
                <Col span={12}>
                  <div className={classes.label}>
                    {translate('YOU_RISK')}:<span> </span>
                    <span className={notEnoughCoins ? classes.redColor : ''}>
                      {creatorRisk}
                    </span> <Coins />
                  </div>
                </ Col>
                <Col span={12}>
                  {
                    notEnoughCoins && (
                      <Alert
                        showIcon
                        className={classes.alert}
                        message={`${translate('CAN_NOT_COVER_THE_RISK')}. ${translate('REDUCE_PRIZE_OR_AMOUNT_OF_ATTEMPTS')}`}
                        type="error"
                      />
                    )
                  }
                </Col>
              </Row>
            </div>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
}

const styles = {
  createGame: {
  },
  redColor: {
    color: redColor,
  },
  alert: {
    'margin-top': '10px',
  },
  modal: {
    '@media(max-width: 666px)': {
      top: 0,
    },
  },
};

export default compose(
  withLocalize,
  withUser(),
  withGameConfig(),
  Form.create(),
  withState('chanceToWin', 'setChanceToWin', 50),
  withState('maxAttempts', 'setMaxAttempts', ({ gameConfig: { MAX_ATTEMPTS } }) => MAX_ATTEMPTS),
  withState('prize', 'setPrize', ({ gameConfig: { GAME_MIN_PRIZE } }) => GAME_MIN_PRIZE),
  withHandlers({
    getCreatorRisk: () => ({ prize, maxAttempts }) => {
      return toFixedIfNeed(prize * maxAttempts);
    },
    prizeTipFormatter: () => (value) => (<span>{value} <Coins /></span>),
    chanceTipFormatter: () => (value) => <span>{value}%</span>,
  }),
  injectSheet(styles),
  pure,
)(CreateGameForm);

CreateGameForm.defaultProps = {
  visible: false,
};

CreateGameForm.propTypes = {
  form: PropTypes.object.isRequired,
  gameConfig: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  setChanceToWin: PropTypes.func.isRequired,
  setPrize: PropTypes.func.isRequired,
  prizeTipFormatter: PropTypes.func.isRequired,
  chanceTipFormatter: PropTypes.func.isRequired,
  getCreatorRisk: PropTypes.func.isRequired,
  prize: PropTypes.number.isRequired,
  chanceToWin: PropTypes.number.isRequired,
  maxAttempts: PropTypes.number.isRequired,
  visible: PropTypes.bool,
};
