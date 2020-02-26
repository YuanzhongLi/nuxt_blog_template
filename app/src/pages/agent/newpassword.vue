<template>
  <div>
    <NewPasswordSP
      v-if="device.isMobile"
      @submit="submit"
    />
    <NewPasswordPC
      v-else
      @submit="submit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import log from '~/utils/log';
import NewPasswordPC from '~/components/templates/agent_pc/newpassword';
import NewPasswordSP from '~/components/templates/agent_sp/newpassword';

export default {
  layout: 'default',
  components: {
    NewPasswordPC,
    NewPasswordSP,
  },
  mixins: [siteinfo, notification],
  middleware: 'injectAgent',
  computed: {
    ...mapState(['device', 'agent']),
  },
  methods: {
    async submit(email) {
      if (!email) {
        this.setNotificationMessage('error', 'メールアドレスが入力されていません');
        return;
      }

      this.openLoadingModal();

      const { error } = await this.$axios
        .$post('/agent/password_new', {
          email,
        })
        .catch((err) => {
          log.error(err);
          return { error: '送信に失敗しました' };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.setNotificationMessage('success', '新しいパスワードを送信しました');

      this.$router.push('/?confirm=newpassword');
    },
  },
  head() {
    return {
      title: this.getHeadTitle('パスワード再設定'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>
