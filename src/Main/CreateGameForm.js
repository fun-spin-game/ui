import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import autoBind from 'auto-bind';
import { Slider, Row, Col, InputNumber, Alert, Form, Modal } from 'antd';
import injectSheet from 'react-jss'
import Coins from '../common/Coins'
import { redColor } from '../variables'
import { getRisk, toFixedIfNeed } from '../helpers/gameUtils'
import withGames from '../redux/games/withGames';
import withUser from '../redux/user/withUser';

const FormItem = Form.Item;

const MIN_CHANCE_TO_WIN = 5;
const MAX_CHANCE_TO_WIN = 95;
const MIN_ATTEMPTS = 1;
const MAX_ATTEMPTS = 20;
const MIN_PRIZE = 1;
const MAX_PRIZE = 1000;
const COL_LEFT = 6;
const COL_RIGHT = 18;

class CreateGameForm extends Component {
  constructor() {
    super();
    autoBind(this);
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
      form: { getFieldDecorator }
    } = this.props;
    const { prize, chanceToWin, maxAttempts } = this.state;
    const creatorRisk = this.getCreatorRisk({ prize, maxAttempts });
    const notEnoughCoins = creatorRisk > balance;
    return (
      <Modal
        title="Create lot"
        visible={visible}
        okButtonProps={{ disabled: notEnoughCoins }}
        onOk={() => handleSubmit({ prize, chanceToWin, maxAttempts })}
        onCancel={onCancel}
        okText={'Create'}
      >
        <Form id="createGame" className={classes.createGame} onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('prize')(
              <div>
                <div className={classes.label}>Prize:</div>
                <Row>
                  <Col span={COL_LEFT} className={classes.coinsInput}>
                    <InputNumber
                      min={MIN_PRIZE}
                      max={MAX_PRIZE}
                      onChange={this.onChangePrize}
                      value={this.state.prize}
                    />
                  <Coins />
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
            {getFieldDecorator('prize')(
              <div>
                <div className={classes.label}>Attempts:</div>
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
                  <Col span={10}>
                    <div className={classes.label}>You can win: {toFixedIfNeed(getRisk({ prize, chanceToWin }))} <Coins /></div>
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
                          message="Not enough coins to cover you risk. Reduce prize or amount of maxAttempts"
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
      top: 13,
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
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};
