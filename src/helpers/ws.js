import { wsGenerateMessage, wsParseMessage } from 'pty-common/ws-message';

export default class WS {
  static init(...args) {
    WS.instance = new WS(...args);

    return WS.instance;
  }

  constructor() {
    this.messageEventMap = {};
  }

  on(type, cb) {
    this.messageEventMap[type] = cb;
  }

  off(type) {
    delete this.messageEventMap[type];
  }

  connect() {
    this.socket = new WebSocket(`${process.env.REACT_APP_BASE_WS_URL}`);
    this.assign();
  }

  send(type, payload) {
    this.socket.send(wsGenerateMessage(type, payload));

    console.log(`sent ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
  }

  assign() {
    this.socket.onmessage = ({ data }) => {
      const { type, payload } = wsParseMessage(data);

      console.log(`recieved ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);

      if (this.messageEventMap[type]) {
        this.messageEventMap[type](payload);
      }
    };
  }
}
