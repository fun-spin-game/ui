import { wsGenerateMessage, wsParseMessage } from 'pty-common/ws-message';
import WebSocket from 'ws';

export default class WS {
  static init(...args) {
    WS.instance = new WS(...args);

    return WS.instance;
  }

  constructor({ baseUrlSocket }) {
    this.messageEventMap = {};
    this.baseUrlSocket = baseUrlSocket;
  }

  setToken(token) {
    this.token = token;
  }

  on(type, cb) {
    this.messageEventMap[type] = cb;
  }

  off(type) {
    delete this.messageEventMap[type];
  }

  connect() {
    this.socket = new WebSocket(`${this.baseUrlSocket}/?token=${this.token}`, {
      perMessageDeflate: false,
    });
    this.assign();
  }

  send(type, payload) {
    this.socket.send(wsGenerateMessage(type, payload, this.token));

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
