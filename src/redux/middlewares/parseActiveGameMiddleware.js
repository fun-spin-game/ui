import { AES, enc } from 'crypto-js';
window.AES = AES;
window.enc = enc;
export default (store) => (next) => (action) => {
  const state = store.getState();
  const { user: { userInfo } } = state;
  if (!userInfo) return next(action);

  const { type, payload: { game, reason } = {} } = action;

  if (type === 'GAME_UPDATED' && reason === 'GAME_USER_CONNECTED' && game.connectedUserId === userInfo.id) {
    game.decryptedSchema = AES.decrypt(game.schema, 'dAfg$1397642gsge_39').toString(enc.Utf8);
    action.meta = { ...action.meta, activeGameId: game.id };
  }

  if (type === 'GAME_UPDATED' && reason === 'GAME_USER_DISCONNECTED' && state.games.activeGameId === game.id) {
    action.meta = { ...action.meta, activeGameId: null };
  }

  return next(action);
};
