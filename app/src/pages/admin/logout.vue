<script>
import siteinfo from '~/mixins';
import AppConfig from '../../../config';

export default {
  mixins: [siteinfo],
  fetch({ app, redirect, store }) {
    return app.$axios
      .$get('/auth/logout/admin')
      .then(() => store.commit('setAdminToken', ''))
      .then(() => store.commit('agent/setAdminData', {
        adminId: null,
        isLoggedIn: false,
      }))
      .then(() => {
        window.location = AppConfig.HOST_URL;
      });
  },
  head() {
    return {
      title: this.getHeadTitle('ログアウト'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
