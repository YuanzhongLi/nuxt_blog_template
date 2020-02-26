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
  if (!store.state.tenant.isLoggedIn) {
    return redirect('/tenant/login');
  }
}
/* eslint-enable */
