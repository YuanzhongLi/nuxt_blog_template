<template>
  <div class="p-newpassword">
    <form class="p-newpassword__form">
      <h1 class="p-newpassword__formTtl">
        パスワードの再発行
      </h1>
      <InputBox
        icon="far fa-envelope"
        label="現在のメールアドレス"
        id="mail"
        input-type="email"
        :label-content="email"
        @input="email = $event"
        placeholder="例：taro-yamada@estie.co.jp"
        :is-required="true"
      />
      <p class="p-newpassword__label">
        登録しているメールアドレスを入力してください。新しいパスワードをお送りいたします。
      </p>
      <div class="p-newpassword__save">
        <button
          class="p-newpassword__saveBtn"
          :class="{'is-disabled': !email}"
          @click.prevent="submit"
        >
          送信
        </button>
      </div>
      <ul class="p-newpassword__formFooter">
        <li>
          <n-link
            class="p-newpassword__textAnchor"
            to="signup"
          >
            新規登録
          </n-link>
        </li>
        <li>
          <n-link
            class="p-newpassword__textAnchor"
            to="login"
          >
            ログイン
          </n-link>
        </li>
      </ul>
    </form>
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
    };
  },
  methods: {
    submit() {
      if (!this.email) return;
      this.$emit('submit', this.email);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-newpassword {
  @include p-newpassword;
}
</style>
