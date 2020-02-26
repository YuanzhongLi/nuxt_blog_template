import {
  isValidEmail,
  isEmpty,
} from '~/utils/validation';
import log from '~/utils/log';
import notification from '~/mixins/notification';

export default {
  mixins: [notification],
  data() {
    const emptyErrorMessageEmail = {
      email: 'メールアドレス',
    };
    return {
      emptyErrorMessageEmail,
    };
  },
  methods: {
    async signupEmail(values) {
      this.resetNotificationMessage();
      const { avatarUrl } = this;
      const { isMobile } = this.$store.state.device;
      const emptyErrorMessage = this.emptyErrorMessageEmail;
      for (let i = 0; i < Object.keys(values).length; i += 1) {
        const key = Object.keys(values)[i];
        if (emptyErrorMessage[key] !== undefined && isEmpty(values[key])) {
          this.setNotificationMessage('error', `記入していない必須項目（${emptyErrorMessage[key]}）があります`);
          return;
        }
      }
      if (!isValidEmail(values.email)) {
        this.setNotificationMessage('error', '無効なアドレスです');
        return;
      }
      this.openLoadingModal();
      const bd = Object.assign({}, values, { avatarUrl });
      const { error } = await this.$axios.$post('/tenant/signup/signup_email', bd)
        .catch((err) => {
          log.error(err);
          return { error: 'エラーが発生しました' };
        });
      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.setNotificationMessage('success', 'メールアドレスに送信された確認リンクをクリックしてください');
      this.$router.push('/?confirm=signup');
      // Google Tag Manager Custom Event
      if (isMobile) {
        this.$gtm.pushEvent({ event: 'tenant_signup_email_only_sp' });
      }
      this.$gtm.pushEvent({ event: 'tenant_signup_email_only_pc' });
    },
  },
};
