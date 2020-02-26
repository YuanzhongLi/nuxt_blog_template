/**
 * userデータをストアに保存する処理をコールする。
 *
 * @param {Object} store
 * @param {Object} redirect
 */
/* eslint-disable consistent-return */
export default function ({
  store,
  redirect,
}) {
  if (!store.state.user.isLoggedIn) {
    return redirect('/user/login');
  }
}
/* eslint-enable */
