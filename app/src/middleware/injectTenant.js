import log from '../utils/log';

/**
 * tenantデータをストアに保存する処理をコールする。
 *
 * @param {Object} app
 * @param {Object} store
 */
export default async function ({
  app,
  store,
}) {
  await store.dispatch('tenant/injectTenantData', {
    app,
    tenantAccessToken: store.state.tenantToken,
  }).catch(log.error);
}
