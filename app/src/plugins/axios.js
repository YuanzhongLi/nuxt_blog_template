import log from '../utils/log';

// CSRFトークンを自動で付与するメソッド
export const requireCsrfTokenMethods = ['post', 'put', 'patch'];
// CSRFトークンが不要なAPI
export const notUseCsrfTokenActions = [
  // ログイン
  '/auth/login/admin',
  // 新規パスワード発行
  '/admin/password_new',
  '/admin/password_new',
  // 新規登録（通常）
  '/admin/signup/signup_normal',
  '/admin/signup/signup_normal',
  // 新規登録（確認）
  '/signup/confirm',
];

export default function ({ $axios }) {
  // リクエストが処理される場所（クライアント or サーバ）によって API のリクエスト先を変更する
  // フロントからの場合は CORS 対策として自ホストの /api とするが、API が別ホストの場合は nuxt.config.js によって Proxy が設定される
  $axios.defaults.baseURL = process.browser ? '/api' : process.env.API_HOST_INTERNAL_URL;
  $axios.onRequest(async (config) => {
    if (
      notUseCsrfTokenActions.indexOf(config.url) === -1
      && requireCsrfTokenMethods.indexOf(config.method) !== -1
    ) {
      if (config.url.includes('admin')) {
        config.headers.common['X-CSRF-TOKEN'] = await $axios
          .$get('/auth/generate_csrf_token/admin')
          .then(data => data.adminCsrfToken)
          .catch(log.errorAndReturnNull);
      }
    }
    return config;
  });
  $axios.withAccessToken = (token) => {
    $axios.setToken(token, 'Bearer');
    return $axios;
  };
}
