<template>
  <div class="p-login">
    <div class="p-main__linkRight">
      <nuxt-link to="/admin">
        テナント一覧ページへ
      </nuxt-link>
    </div>
    <div class="p-login__form">
      <h1 class="p-login__formTtl">
        ログイン for Admin
      </h1>
      <ul class="p-login__list">
        <li class="p-login__item">
          <h3>
            以下の項目は招待されたい側の人が書いてください
          </h3>
        </li>
        <li class="p-login__item">
          <InputBox
            icon="fas fa-user-circle"
            label="名前"
            id="name"
            input-type="text"
            :label-content="name"
            @input="name = $event"
            :is-required="true"
          />
        </li>
        <li class="p-login__item">
          <InputBox
            icon="fas fa-lock"
            label="パスワード"
            id="password"
            input-type="password"
            @input="password = $event"
            :label-content="password"
            placeholder="半角英数字8文字以上"
            :is-required="true"
          />
        </li>
        <li class="p-login__item">
          <InputBox
            icon="fas fa-lock"
            label="パスワード（確認用）"
            id="confirmPassword"
            @input="confirmPassword = $event"
            :label-content="confirmPassword"
            input-type="password"
            placeholder="半角英数字8文字以上"
            :is-required="true"
          />
        </li>
      </ul>
      <div class="p-login__save">
        <div
          class="p-login__saveBtn"
          @click="invite"
        >
          招待する
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import InputBox from '~/components/elements/common/InputBox';
import notification from '~/mixins/notification';
import log from '~/utils/log';
import { isValidPassword, isValidAdminName } from '~/utils/validation';

export default {
  components: {
    InputBox,
  },
  mixins: [siteinfo, notification],
  middleware: ['injectDevice', 'injectAdmin', 'adminAuthenticated'],
  computed: {
    ...mapState(['device', 'admin']),
  },
  data() {
    return {
      name: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    async invite() {
      this.resetNotificationMessage();
      const { name, password, confirmPassword } = this;
      if (!name || !password || !confirmPassword) {
        this.setNotificationMessage('error', '入力されていない項目があります');
        return;
      }

      if (!isValidPassword(password)) {
        this.setNotificationMessage('error', 'パスワードは半角英字と半角数字それぞれ1文字以上含む8文字以上の文字列である必要があります');
        return;
      }

      if (!isValidAdminName(name)) {
        this.setNotificationMessage('error', '名前は半角英字(小文字)もしくは半角数字のみにしてください');
        return;
      }

      if (password !== confirmPassword) {
        this.setNotificationMessage('error', '確認用パスワードと一致しません');
        return;
      }


      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.adminToken);
      const { error } = await client
        .$post('/admin/create_admin', {
          name,
          password,
        })
        .catch((err) => {
          log.error(err);
          return err;
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.setNotificationMessage('success', '登録しました。登録したアカウントでログインしてください');
      this.$router.push('/admin');
    },
  },
};
</script>

<style lang="scss" scoped>
.p-login {
  @include p-login;
}

.p-main {
  @include p-main;
}
</style>
