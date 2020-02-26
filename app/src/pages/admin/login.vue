<template>
  <div class="p-login">
    <div class="p-login__form">
      <h1 class="p-login__formTtl">
        ログイン for Admin
      </h1>
      <ul class="p-login__list">
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
      </ul>
      <div class="p-login__save">
        <div
          class="p-login__saveBtn"
          @click="login"
        >
          ログイン
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

export default {
  components: {
    InputBox,
  },
  mixins: [siteinfo, notification],
  middleware: ['injectDevice', 'injectAdmin'],
  fetch({ app, store, redirect }) {
    if (store.state.admin.isLoggedIn) {
      redirect('/admin');
    }
  },
  computed: {
    ...mapState(['device', 'admin']),
  },
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    async login() {
      this.resetNotificationMessage();
      const { name, password } = this;
      if (!name || !password) {
        this.setNotificationMessage('error', '入力されていない項目があります');
        return;
      }

      this.openLoadingModal();

      const { error, adminAccessToken } = await this.$axios
        .$post(
          '/auth/login/admin',
          {
            password,
            name,
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
      await this.$store.commit('setAdminToken', adminAccessToken);
      this.$router.push('/admin');
    },
  },
  head() {
    return {
      title: this.getHeadTitle('ログイン / アドミン'),
      meta: [{ name: 'robots', content: 'noindex' }],
    };
  },
};
</script>

<style lang="scss" scoped>
.p-login {
  @include p-login;
}
</style>
