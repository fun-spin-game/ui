
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
    this.socket.reconnectCounter = 20;
  }

  send(type, payload) {
    this.socket.send(JSON.stringify({ type, payload }));
    // console.log(`sent ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
  }
  onMessage({ data }) {
    const {  onMessage } = this.callbacks;
    const { type, payload } = JSON.parse(data);
    // console.log(`recieved ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
    if (onMessage) onMessage({ type, payload });
  }
  onError(error) {
    const {  onError } = this.callbacks;
    // console.log('ws error', error);
    if (onError) onError(error);
  }
  onClose() {
    const {  onClose } = this.callbacks;
    // console.log('ws closed');
    this.socket.onmessage = null;
    this.socket.onclose = null;
    this.socket.onopen = null;
    this.socket.onerror = null;

    if (onClose) onClose();
  }
  onOpen() {
    // console.log('ws opened');
    const {  onOpen } = this.callbacks;
    if (onOpen) onOpen();
  }
  on(action, cb) {
    this.callbacks[`on${action.charAt(0).toUpperCase() + action.slice(1)}`] = cb;
    return this;
  }
}
