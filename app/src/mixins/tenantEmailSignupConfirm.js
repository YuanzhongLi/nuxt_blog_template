import {
  isValidPhoneNumber,
  isValidPassword,
  isEmpty,
} from '~/utils/validation';
import log from '~/utils/log';
import notification from '~/mixins/notification';

export default {
  mixins: [notification],
  data() {
    const emptyErrorMessage = {
      name: '名前',
      phoneNumber: '電話番号',
      company: '会社名',
      password: 'パスワード',
      confirmPassword: 'パスワード（確認用）',
      budget: '月額賃料予算',
      employees: 'オフィスを利用する社員数',
      movingTerm: '希望入居時期',
      area: '希望エリア',
    };
    return {
      emptyErrorMessage,
    };
  },
  methods: {
    async signupEmailConfirm(values) {
      this.resetNotificationMessage();
      const { avatarUrl } = this;
      const { isMobile } = this.$store.state.device;
      // const emptyErrorMessage = this.emptyErrorMessageNormal; で従来の項目数の多いvalidationに切り替え
      const { emptyErrorMessage } = this;
      for (let i = 0; i < Object.keys(values).length; i += 1) {
        const key = Object.keys(values)[i];
        if (emptyErrorMessage[key] !== undefined && isEmpty(values[key])) {
          if (key === 'area') {
            this.setNotificationMessage('error', `記入していない必須項目（${emptyErrorMessage[key]}）があります(追加ボタンを押してください)`);
          } else {
            this.setNotificationMessage('error', `記入していない必須項目（${emptyErrorMessage[key]}）があります`);
          }
          return;
        }
      }
      if (values.budget >= 10000 || values.budget <= 0) {
        this.setNotificationMessage('error', '予算は「万円」単位で入力してください');
        return;
      }
      if (!isValidPhoneNumber(values.phoneNumber)) {
        this.setNotificationMessage('error', '電話番号は10・11桁で、半角数字と半角ハイフンのみ入力可です。');
        return;
      }
      // チェックしたOKだった場合改めてvaluesにハイフンなしを入れる。
      values.phoneNumber = values.phoneNumber.replace(/-/g, '');
      if (!isValidPassword(values.password)) {
        this.setNotificationMessage('error', 'パスワードは半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列である必要があります');
        return;
      }
      if (values.password !== values.confirmPassword) {
        this.setNotificationMessage('error', '確認用のパスワードと異なります');
        return;
      }
      if (!values.termConsented) {
        this.setNotificationMessage('error', '利用規約に同意してください');
        return;
      }
      this.openLoadingModal();
      const bd = Object.assign({}, values, { avatarUrl });
      const { error } = await this.$axios.$post('/tenant/signup/signup_email_confirm', bd)
        .catch((err) => {
          log.error(err);
          return { error: 'エラーが発生しました' };
        });
      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.setNotificationMessage('success', '登録に成功しました');
      this.$router.push('/tenant');
      if (isMobile) {
        this.$gtm.pushEvent({ event: 'tenant_signup_complete_sp' });
      }
      this.$gtm.pushEvent({ event: 'tenant_signup_complete_pc' });
    },
  },
};
