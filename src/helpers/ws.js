import debug from 'debug';

const log = debug('ws');
const MAX_RECONNECT_ATTEMPTS = 5;

export default class WS {
  static init(...args) {
    WS.instance = new WS(...args);
    return WS.instance;
  }

  constructor() {
    this.callbacks = {};
    this.connect = this.connect.bind(this);
    this.send = this.send.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onError = this.onError.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.on = this.on.bind(this);
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(`${process.env.REACT_APP_BASE_WS_URL}`);
    this.socket.onopen = this.onOpen;
    this.socket.onerror = this.onError;
    this.socket.onmessage = this.onMessage;
    this.socket.onclose = this.onClose;
    this.socket.reconnectInterval = this.null;
    this.socket.reconnectCounter = 20;
  }

  send(type, payload) {
    this.socket.send(JSON.stringify({ type, payload }));
    log(`sent ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
  }
  onMessage({ data }) {
    const {  onMessage } = this.callbacks;
    const { type, payload } = JSON.parse(data);
    log(`recieved ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
    if (onMessage) onMessage({ type, payload });
  }
  onError(error) {
    const {  onError } = this.callbacks;
    log('ws error', error);
    if (onError) onError(error);
  }
  onClose() {
    const {  onClose } = this.callbacks;
    log('ws closed');
    this.socket.onmessage = null;
    this.socket.onclose = null;
    this.socket.onopen = null;
    this.socket.onerror = null;
    this.reconnectInterval = setInterval(() => {
      this.connect.bind(this)
      this.reconnectCounter += 1;
      if (this.reconnectCounter >= MAX_RECONNECT_ATTEMPTS) {
        clearInterval(this.reconnectInterval);
        this.reconnectCounter = 0;
      }
    }, 5000);
    if (onClose) onClose();
  }
  onOpen() {
    log('ws opened');
    const {  onOpen } = this.callbacks;
    clearInterval(this.reconnectInterval);
    if (onOpen) onOpen();
  }
  on(action, cb) {
    this.callbacks[`on${action.charAt(0).toUpperCase() + action.slice(1)}`] = cb;
    return this;
  }
}
