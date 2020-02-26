<template>
  <div>
    <ChangeEmailSP
      v-if="device.isMobile"
      :save-new-email="saveNewEmail"
    />
    <ChangeEmailPC
      v-else
      :save-new-email="saveNewEmail"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import { isValidEmail } from '~/utils/validation';
import log from '~/utils/log';

import ChangeEmailPC from '~/components/templates/tenant_pc/change-email';
import ChangeEmailSP from '~/components/templates/tenant_sp/change-email';

export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    ChangeEmailPC,
    ChangeEmailSP,
  },
  mixins: [siteinfo, notification, webpush],
  middleware: ['injectDevice', 'injectTenant', 'tenantAuthenticated'],
  computed: {
    ...mapState(['device', 'tenant']),
  },
  methods: {
    async saveNewEmail(password, newEmail, currentEmail) {
      this.resetNotificationMessage();

      if (!isValidEmail(newEmail)) {
        this.setNotificationMessage('error', '無効なアドレスです');
        return;
      }
      if (newEmail === currentEmail) {
        this.setNotificationMessage('error', '前回登録したメールアドレスと同じメールアドレスです');
        return;
      }

      this.openLoadingModal();

      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { error } = await client
        .$post('/auth/password/tenant', {
          password,
        })
        .then(async (isCorrectPassword) => {
          if (!isCorrectPassword) {
            return { error: 'パスワードが違います' };
          }
          await client.$post('/tenant/email_update', {
            email: newEmail,
          });
          return { error: null };
        })
        .catch((err) => {
          log.error(err);
          return { error: 'エラーが発生しました' };
        });

      this.closeLoadingModal();

      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.setNotificationMessage('success', '新しいメールアドレスに送信された確認リンクをクリックしてください');
    },
  },
  head() {
    return {
      title: this.getHeadTitle('メールアドレスの変更'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
