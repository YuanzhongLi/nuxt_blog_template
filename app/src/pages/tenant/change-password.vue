<template>
  <div>
    <ChangePasswordSP
      v-if="device.isMobile"
      :save-new-password="saveNewPassword"
    />
    <ChangePasswordPC
      v-else
      :save-new-password="saveNewPassword"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import { isValidPassword } from '~/utils/validation';
import log from '~/utils/log';

import ChangePasswordPC from '~/components/templates/tenant_pc/change-password';
import ChangePasswordSP from '~/components/templates/tenant_sp/change-password';

export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    ChangePasswordPC,
    ChangePasswordSP,
  },
  mixins: [siteinfo, notification, webpush],
  middleware: ['injectDevice', 'injectTenant', 'tenantAuthenticated'],
  computed: {
    ...mapState(['device', 'tenant']),
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  methods: {
    async saveNewPassword(currentPassword, confirmationPassword, newPassword) {
      this.resetNotificationMessage();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);

      if (newPassword !== confirmationPassword) {
        this.setNotificationMessage('error', 'パスワードが異なります');
        return;
      }

      if (!isValidPassword(newPassword)) {
        this.setNotificationMessage('error', 'パスワードは半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列である必要があります');
        return;
      }

      this.openLoadingModal();

      const isCorrectPassword = await client
        .$post('/auth/password/tenant', {
          password: currentPassword,
        })
        .catch((err) => {
          log.error(err);
          return 'error';
        });

      if (isCorrectPassword === 'error') {
        this.setNotificationMessage('error', 'エラーが発生しました');
        this.closeLoadingModal();
        return;
      }

      if (!isCorrectPassword) {
        this.$nuxt.$loading.finish();
        this.setNotificationMessage('error', '現在のパスワードが違います');
        this.closeLoadingModal();
        return;
      }

      const { error } = await client
        .$post('/tenant/password_update', {
          password: newPassword,
        })
        .catch((err) => {
          log.error(err);
          return { error: 'エラーが発生しました' };
        });

      if (error) {
        this.setNotificationMessage('error', error);
        this.closeLoadingModal();
        return;
      }

      this.setNotificationMessage('success', 'パスワードが変更されました');
      this.closeLoadingModal();

      this.$router.push('/tenant/info?confirm=password');
    },
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
