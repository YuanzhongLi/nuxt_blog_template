<script>
import siteinfo from '~/mixins';
import AppConfig from '../../../config';

export default {
  mixins: [siteinfo],
  fetch({ app, redirect, store }) {
    return app.$axios
      .$get('/auth/logout/agent')
      .then(() => store.commit('setAgentToken', ''))
      .then(() => store.commit('agent/setAgentData', {
        agentId: null,
        isLoggedIn: false,
        // agent: null,
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
