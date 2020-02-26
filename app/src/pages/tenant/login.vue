<template>
  <div>
    <TenantLoginSP
      v-if="device.isMobile"
      :login="login"
    />
    <TenantLoginPC
      v-else
      :login="login"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';

import TenantLoginPC from '~/components/templates/tenant_pc/login';
import TenantLoginSP from '~/components/templates/tenant_sp/login';

export default {
  layout: 'default',
  components: {
    TenantLoginPC,
    TenantLoginSP,
  },
  mixins: [siteinfo, notification],
  middleware: 'injectDevice',
  fetch({ app, store, redirect }) {
    if (store.state.tenant.isLoggedIn) {
      redirect('/tenant');
    }
  },
  computed: {
    ...mapState(['device', 'tenant']),
  },
  methods: {
    async login(email, password) {
      this.resetNotificationMessage();

      if (!email || !password) {
        this.setNotificationMessage('error', '入力されていない項目があります');
        return;
      }

      this.openLoadingModal();

      const { error, tenantAccessToken } = await this.$axios
        .$post(
          '/auth/login/tenant',
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
      await this.$store.commit('setTenantToken', tenantAccessToken);
      this.$router.push(this.$store.state.lastVisitedPath || '/tenant');
    },
  },
  head() {
    return {
      title: this.getHeadTitle('ログイン / テナント'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
