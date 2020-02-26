import log from '../utils/log';

/**
 * agentデータをストアに保存する処理をコールする。
 *
 * @param {Object} app
 * @param {Object} store
 */
export default async function ({
  app,
  store,
}) {
  await store.dispatch('admin/injectAdminData', {
    app,
    adminAccessToken: store.state.adminToken,
  }).catch(log.error);
}
