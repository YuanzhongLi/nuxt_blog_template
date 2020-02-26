<template>
  <div>
    <AgentLoginSP
      v-if="device.isMobile"
      :login="login"
    />
    <AgentLoginPC
      v-else
      :login="login"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';

import AgentLoginPC from '~/components/templates/agent_pc/login';
import AgentLoginSP from '~/components/templates/agent_sp/login';

export default {
  layout: 'default',
  components: {
    AgentLoginPC,
    AgentLoginSP,
  },
  computed: {
    ...mapState(['device', 'agent']),
  },
  middleware: ['injectAgent'],
  mixins: [siteinfo, notification],
  fetch({ app, store, redirect }) {
    if (store.state.agent.isLoggedIn) {
      redirect('/agent');
    }
  },
  methods: {
    async login(email, password) {
      this.resetNotificationMessage();

      if (!email || !password) {
        this.setNotificationMessage('error', '入力されていない項目があります');
        return;
      }

      this.openLoadingModal();

      const { error, agentAccessToken } = await this.$axios
        .$post(
          '/auth/login/agent',
          {
            password,
            email,
          },
          {
            withCredentials: true,
          },
        )
        .catch((err) => {
          if (err.response.status === 400) {
            return { error: err.response.data.error };
          }
          return { error: 'エラーが発生しました' };
        });

      this.closeLoadingModal();

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      await this.$store.commit('setAgentToken', agentAccessToken);
      this.$router.push(this.$store.state.lastVisitedPath || '/agent');
    },
  },
  head() {
    return {
      title: this.getHeadTitle('ログイン /　エージェント'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
