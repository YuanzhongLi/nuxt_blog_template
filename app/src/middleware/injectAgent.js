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
  await store.dispatch('agent/injectAgentData', {
    app,
    agentAccessToken: store.state.agentToken,
  }).catch(log.error);
}
