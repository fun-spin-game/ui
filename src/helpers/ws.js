export default class WS {
  static init(...args) {
    WS.instance = new WS(...args);
    return WS.instance;
  }

  constructor() {
    this.callbacks = {};
    this.connect();
  }

  connect(callbacks) {
    this.socket = new WebSocket(`${process.env.REACT_APP_BASE_WS_URL}`);
    this.socket.onopen = this.onOpen.bind(this, callbacks);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onclose = this.onClose.bind(this);
  }

  sendAction(type, payload) {
    this.socket.send(JSON.stringify({ type, payload }));
    console.log(`sent ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
  }
  onMessage({ data }) {
    const {  onMessage } = this.callbacks;
    const { type, payload } = JSON.parse(data);
    console.log(`recieved ${type} with payload ${JSON.stringify(payload).substr(0, 10000)}`);
    if (onMessage) onMessage({ type, payload });
  }
  onError(error) {
    const {  onError } = this.callbacks;
    console.log('ws error', error);
    if (onError) onError(error);
  }
  onClose() {
    const {  onClose } = this.callbacks;
    console.log('ws closed');
    this.socket.onmessage = null;
    this.socket.onclose = null;
    this.socket.onopen = null;
    this.socket.onerror = null;
    this.reconnectInterval = setInterval(this.connect.bind(this), 1000);
    if (onClose) onClose();
  }
  onOpen() {
    console.log('ws opened');
    const {  onOpen } = this.callbacks;
    clearInterval(this.reconnectInterval);
    if (onOpen) onOpen();
  }
  on(action, cb) {
    this.callbacks[`on${action.charAt(0).toUpperCase() + action.slice(1)}`] = cb;
  }

}
