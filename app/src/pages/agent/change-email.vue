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
import log from '~/utils/log';
import { isValidEmail } from '~/utils/validation';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import ChangeEmailPC from '~/components/templates/agent_pc/change-email';
import ChangeEmailSP from '~/components/templates/agent_sp/change-email';

export default {
  layout: ctx => (ctx.isMobile ? 'agent_sp' : 'agent_pc'),
  components: {
    ChangeEmailPC,
    ChangeEmailSP,
  },
  middleware: ['injectAgent', 'agentAuthenticated'],
  mixins: [siteinfo, notification, webpush],
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  computed: {
    ...mapState(['device', 'agent']),
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

      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      const { error } = await client
        .$post('/auth/password/agent', {
          password,
        })
        .then(async (isCorrectPassword) => {
          if (!isCorrectPassword) {
            return { error: 'パスワードが違います' };
          }
          await client.$post('/agent/email_update', {
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
