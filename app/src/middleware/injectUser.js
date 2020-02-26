import log from '../utils/log';

/**
 * userデータをストアに保存する処理をコールする。
 *
 * @param {Object} app
 * @param {Object} store
 */
export default async function ({
  app,
  store,
}) {
  await store.dispatch('user/injectUserData', {
    app,
    userAccessToken: store.state.userToken,
  }).catch(log.error);
}
