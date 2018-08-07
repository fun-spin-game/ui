import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Slider, Row, Col, InputNumber, Alert, Form, Modal } from 'antd';
import injectSheet from 'react-jss'
import { withLocalize } from 'react-localize-redux';
import Coins from '../common/Coins'
import { redColor } from '../variables'
import { getRisk, toFixedIfNeed } from '../helpers/gameUtils'
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';

const FormItem = Form.Item;

const MIN_CHANCE_TO_WIN = 5;
const MAX_CHANCE_TO_WIN = 95;
const MIN_ATTEMPTS = 1;
const MAX_ATTEMPTS = 20;
const MIN_PRIZE = 1;
const MAX_PRIZE = 1000;
const COL_LEFT = 11;
const COL_RIGHT = 13;

class CreateGameForm extends Component {
  constructor() {
    super();
    this.onChangeChanceToWin = this.onChangeChanceToWin.bind(this)
    this.onChangeMaxAttempts = this.onChangeMaxAttempts.bind(this)
    this.onChangePrize = this.onChangePrize.bind(this)
    this.getCreatorRisk = this.getCreatorRisk.bind(this)
    this.state = {
      chanceToWin: 50,
      maxAttempts: 1,
      prize: MIN_PRIZE,
    };
  }
  onChangeChanceToWin(value) {
    this.setState({ chanceToWin: value })
  }
  onChangeMaxAttempts(value) {
    this.setState({ maxAttempts: value })
  }
  onChangePrize(value) {
    this.setState({ prize: value })
  }
  getCreatorRisk({ prize, maxAttempts }) {
    return toFixedIfNeed(prize * maxAttempts);
  }
  render() {
    const {
      classes,
      userInfo: { balance },
      handleSubmit,
      visible,
      onCancel,
      translate,
      form: { getFieldDecorator }
    } = this.props;
    const { prize, chanceToWin, maxAttempts } = this.state;
    const creatorRisk = this.getCreatorRisk({ prize, maxAttempts });
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
                      min={MIN_PRIZE}
                      max={MAX_PRIZE}
                      onChange={this.onChangePrize}
                      value={this.state.prize}
                    /> <Coins />
                  </Col>
                  <Col span={COL_RIGHT}>
                    <Slider
                      min={MIN_PRIZE}
                      max={MAX_PRIZE}
                      tipFormatter={(value) => (<span>{value} <Coins /></span>)}
                      defaultValue={50}
                      onChange={this.onChangePrize}
                      value={this.state.prize}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('prize')(
              <div>
                <div className={classes.label}>{translate('CHANCE_OF_WINNING')}:</div>
                <Row>
                  <Col span={COL_LEFT}>
                    <InputNumber
                      min={MIN_CHANCE_TO_WIN}
                      max={MAX_CHANCE_TO_WIN}
                      value={this.state.chanceToWin}
                      onChange={this.onChangeChanceToWin}
                    /> <span>%</span>
                  </Col>
                  <Col span={COL_RIGHT}>
                    <Slider
                      min={MIN_CHANCE_TO_WIN}
                      max={MAX_CHANCE_TO_WIN}
                      defaultValue={50}
                      tipFormatter={(value) => <span>{value}%</span>}
                      onChange={this.onChangeChanceToWin}
                      value={this.state.chanceToWin}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('prize')(
              <div>
                <div className={classes.label}>{translate('MAX_AMOUNT_OF_ATTEMPTS')}:</div>
                <Row>
                  <Col span={COL_LEFT}>
                    <InputNumber
                      min={MIN_ATTEMPTS}
                      max={MAX_ATTEMPTS}
                      value={this.state.maxAttempts}
                      onChange={this.onChangeMaxAttempts}
                    />
                  </Col>
                  <Col span={COL_RIGHT}>
                    <Slider
                      min={MIN_ATTEMPTS}
                      max={MAX_ATTEMPTS}
                      defaultValue={50}
                      onChange={this.onChangeMaxAttempts}
                      value={this.state.maxAttempts}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('prize')(
              <div>
                <Row>
                  <Col span={12}>
                    <div className={classes.label}>{translate('YOU_CAN_WIN')}: {toFixedIfNeed(getRisk({ prize, chanceToWin }) * this.state.maxAttempts)} <Coins /></div>
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
                          message={`${translate('LOW_BALANCE')}. ${translate('CAN_NOT_COVER_THE_RISK')}. ${translate('REDUCE_PRIZE_OR_AMOUNT_OF_ATTEMPTS')}`}
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
    '@media(max-width: 600px)': {
      top: 0,
    },
  },
};

export default compose(
  withLocalize,
  withUser(),
  withGames(),
  Form.create(),
  injectSheet(styles),
)(CreateGameForm);

CreateGameForm.defaultProps = {
  visible: false,
};

CreateGameForm.propTypes = {
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userInfo: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};
