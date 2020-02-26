<template>
  <div class="p-login__form">
    <h1 class="p-login__formTtl">
      ログイン
    </h1>
    <ul class="p-login__list">
      <li class="p-login__item">
        <InputBox
          icon="far fa-envelope"
          label="メールアドレス"
          id="email"
          input-type="email"
          :label-content="email"
          @input="email = $event"
          placeholder="例：taro-yamada@estie.co.jp"
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
    <ul class="p-login__formFooter">
      <li>
        <n-link
          class="p-login__textAnchor"
          to="signup"
        >
          新規登録
        </n-link>
      </li>
      <li>
        <n-link
          class="p-login__textAnchor"
          to="newpassword"
        >
          パスワードの再発行
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
import InputBox from '~/components/elements/common/InputBox';

export default {
  components: {
    InputBox,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  props: {
    isTenant: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$emit('login', email, password);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-login {
  @include p-login;
}
</style>
