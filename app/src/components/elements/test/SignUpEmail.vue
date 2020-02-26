<template>
  <div
    class="m-signUpEmail"
    :class="`${this.className}`"
  >
    <p class="m-signUpEmail__label">
      メールアドレスを入力して簡単登録！
    </p>
    <div
      class="m-signUpEmail__wrap"
      :class="{'m-signUpEmail__wrap--sp': device.isMobile}"
    >
      <InputBox
        icon="far fa-envelope"
        label="メールアドレス"
        id="email"
        class="m-signUpEmail__input"
        :label-content="email"
        @input="email = $event"
        input-type="email"
        placeholder="例：taro-yamada@estie.co.jp"
        :is-required="true"
      />
      <div :class="{'m-signUpEmail__btn': device.isMobile}">
        <a
          class="m-signUpEmail__submit"
          :class="{'m-signUpEmail__submit--sp': device.isMobile}"
          @click.prevent="signup"
        >
          <i class="m-signUpEmail__submitIcon fas fa-paper-plane" />今すぐ始める
        </a>
        <nuxt-link
          to="/tenant/login"
          :class="{'m-signUpEmail__login--sp': device.isMobile}"
          class="m-signUpEmail__login"
        >
          ログインはこちら
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InputBox from '~/components/elements/common/InputBox';
import notification from '~/mixins/notification';

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

export default {
  components: {
    InputBox,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
  },
  mixins: [notification],
  data() {
    return {
      email: '',
    };
  },
  computed: {
    ...mapState(['device']),
  },
  methods: {
    signup() {
      const {
        email,
      } = this;
      const values = {
        email,
      };
      this.$emit('signupEmail', values);
    },
  },
};
</script>

<style scoped lang="scss">
.m-signUpEmail {
  @include m-signUpEmail;
}
</style>
