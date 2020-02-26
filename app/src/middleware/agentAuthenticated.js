/**
 * agentデータをストアに保存する処理をコールする。
 *
 * @param {Object} store
 * @param {Object} redirect
 */
/* eslint-disable consistent-return */
export default function ({
  store,
  redirect,
}) {
  if (!store.state.agent.isLoggedIn) {
    return redirect('/agent/login');
  }
}
/* eslint-enable */
