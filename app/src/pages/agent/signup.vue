<template>
  <AgentSPSingup
    v-if="device.isMobile"
    @signup="signup"
    :upload-img="uploadImg"
    :avatar-url="avatarUrl"
  />
  <AgentPCSingup
    v-else
    @signup="signup"
    :upload-img="uploadImg"
    :avatar-url="avatarUrl"
  />
</template>

<script>
import { mapState } from 'vuex';
import log from '~/utils/log';

import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import AgentSPSingup from '~/components/templates/agent_sp/signup';
import AgentPCSingup from '~/components/templates/agent_pc/signup';
import { isValidEmail, isValidPassword } from '~/utils/validation';

export default {
  layout: 'default',
  components: {
    AgentSPSingup,
    AgentPCSingup,
  },
  middleware: 'injectDevice',
  computed: {
    ...mapState(['device']),
  },
  mixins: [siteinfo, notification],
  fetch({ app, store, redirect }) {
    if (store.state.agent.isLoggedIn) {
      redirect('/agent');
    }
  },
  data() {
    return {
      avatarUrl: '',
    };
  },
  methods: {
    timestamp() {
      return JSON.stringify(Date.now());
    },
    async uploadImg(file) {
      this.resetNotificationMessage();
      if (file.size > 1000 * 1024) {
        this.setNotificationMessage('error', '画像は1MB以下をアップロードしてください');
        return;
      }
      const fileType = file.name.split('.').slice(-1)[0];
      const { agentId } = this.$store.state.agent;

      const client = this.$axios.withAccessToken(this.$store.state.agentToken);

      const fileName = `agentid_${agentId}_avatar_${this.timestamp()}_.${fileType}`;
      const formData = new FormData();
      formData.append('fileName', fileName);
      formData.append('image', file);

      this.openLoadingModal();
      const { imgUrl, error } = await client.$post('/auth/upload_img_to_s3/agent', formData)
        .catch((err) => {
          log.error(err);
          return { error: 'アップロードに失敗しました' };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      if (!imgUrl) {
        return;
      }
      this.avatarUrl = imgUrl;
    },
    async signup(name, email, company, password, confirmPassword) {
      const { avatarUrl } = this;

      if (!isValidEmail(email)) {
        this.setNotificationMessage('error', '無効なアドレスです');
        return;
      }

      if (!isValidPassword(password)) {
        this.setNotificationMessage('error', 'パスワードは半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列である必要があります');
        return;
      }

      if (password !== confirmPassword) {
        this.setNotificationMessage('error', '確認用のパスワードと異なります');
        return;
      }

      this.openLoadingModal();

      const { error } = await this.$axios.$post('/agent/signup/signup_normal', {
        name,
        email,
        company,
        password,
        confirmPassword,
        avatarUrl,
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

      this.setNotificationMessage('success', 'チェックを行なっています。登録の完了をお待ちください');

      this.$router.push('/?confirm=signup');
    },
  },
};
</script>
