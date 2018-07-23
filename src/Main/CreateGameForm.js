import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Slider, Row, Col, InputNumber, Alert, Form, Modal } from 'antd';
import injectSheet from 'react-jss'
import Coins from '../common/Coins'
import { redColor } from '../variables'
import { getOpponentRisk } from '../helpers/gameUtils'
import withUser from '../redux/user/withUser';

const FormItem = Form.Item;

const MIN_CHANCE_TO_WIN = 5;
const MAX_CHANCE_TO_WIN = 95;
const MIN_ATTEMPTS = 1;
const MAX_ATTEMPTS = 20;
const MIN_PRIZE = 10;
const COL_LEFT = 6;
const COL_RIGHT = 18;

class CreateGameForm extends Component {
  constructor() {
    super();
    this.state = {
      chanceToWin: 50,
      attempts: 1,
      prize: MIN_PRIZE,
    };
    this.onChangeChanceToWin = this.onChangeChanceToWin.bind(this);
    this.onChangeAttempts = this.onChangeAttempts.bind(this);
    this.onChangePrize = this.onChangePrize.bind(this);
  }
  onChangeChanceToWin(value) {
    this.setState({ chanceToWin: value })
  }
  onChangeAttempts(value) {
    this.setState({ attempts: value })
  }
  onChangePrize(value) {
    this.setState({ prize: value })
  }
  getCreatorRisk({ prize, attempts }) {
    return (prize * attempts).toFixed(2);
  }
  render() {
    const {
      classes,
      userInfo: { balance },
      handleSubmit,
      visible,
      onCancel,
      form: { getFieldDecorator }
    } = this.props;
    const { prize, chanceToWin, attempts } = this.state;
    const creatorRisk = this.getCreatorRisk({ prize, attempts });
    const notEnoughCoins = creatorRisk > balance;
    return (
      <Modal
        title="Create lot"
        visible={visible}
        onOk={() => handleSubmit()}
        onCancel={onCancel}
        okText={'Create'}
      >
        <Form id="createGame" className={classes.createGame} onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('prize', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <div>
                <div className={classes.label}>Prize:</div>
                <Row>
                  <Col span={COL_LEFT} className={classes.coinsInput}>
                    <InputNumber
                      min={MIN_PRIZE}
                      max={balance}
                      onChange={this.onChangePrize}
                      value={this.state.prize}
                    />
                  <Coins />
                  </Col>
                  <Col span={COL_RIGHT}>
                    <Slider
                      min={MIN_PRIZE}
                      max={balance}
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
            {getFieldDecorator('prize', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <div>
                <div className={classes.label}>Opponent chance to win:</div>
                <Row>
                  <Col span={COL_LEFT}>
                    <InputNumber
                      min={MIN_CHANCE_TO_WIN}
                      max={MAX_CHANCE_TO_WIN}
                      value={this.state.chanceToWin}
                      formatter={value => `${value}%`}
                      parser={value => value.replace('%', '')}
                      onChange={this.onChangeChanceToWin}
                    />
                  </Col>
                  <Col span={COL_RIGHT}>
                    <Slider
                      min={MIN_CHANCE_TO_WIN}
                      max={MAX_CHANCE_TO_WIN}
                      defaultValue={50}
                      tipFormatter={(value) => `${value}%`}
                      onChange={this.onChangeChanceToWin}
                      value={this.state.chanceToWin}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('prize', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <div>
                <div className={classes.label}>Attempts:</div>
                <Row>
                  <Col span={COL_LEFT}>
                    <InputNumber
                      min={MIN_ATTEMPTS}
                      max={MAX_ATTEMPTS}
                      value={this.state.attempts}
                      onChange={this.onChangeAttempts}
                    />
                  </Col>
                  <Col span={COL_RIGHT}>
                    <Slider
                      min={MIN_ATTEMPTS}
                      max={MAX_ATTEMPTS}
                      defaultValue={50}
                      onChange={this.onChangeAttempts}
                      value={this.state.attempts}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('prize', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <div>
                <Row>
                  <Col span={10}>
                    <div className={classes.label}>You can win: {getOpponentRisk({ prize, chanceToWin })} <Coins /></div>
                    <div className={classes.label}>
                      You risk:<span> </span>
                      <span className={notEnoughCoins ? classes.redColor : ''}>
                        {creatorRisk}
                      </span> <Coins />
                    </div>
                  </ Col>
                  <Col span={14}>
                    {
                      notEnoughCoins && (
                        <Alert
                          className={classes.alert}
                          message="Not enough coins to cover you risk. Reduce prize or amount of attempts"
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
  coinsInput: {
    position: 'relative',
    '& .fa-coins': {
      position: 'absolute',
      left: 45,
      top: 10,
    }
  },
  redColor: {
    color: redColor,
  },
  alert: {
    'margin-top': '10px',
  }
};

export default compose(
  withUser(),
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
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};
