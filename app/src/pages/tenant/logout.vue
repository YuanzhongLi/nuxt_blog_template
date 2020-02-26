<script>
import siteinfo from '~/mixins';
import AppConfig from '../../../config';

export default {
  mixins: [siteinfo],
  fetch({ app, redirect, store }) {
    return app.$axios
      .$get('/auth/logout/tenant')
      .then(() => store.commit('setTenantToken', ''))
      .then(() => store.commit('tenant/setTenantData', {
        tenantId: null,
        isLoggedIn: false,
        // tenant: null,
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
