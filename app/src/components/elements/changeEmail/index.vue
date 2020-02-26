<template>
  <form
    class="m-changeEmail"
    :class="{'m-changeEmail--sp': device.isMobile}"
  >
    <h1 class="m-changeEmail__ttl">
      メールアドレス変更
    </h1>
    <div class="m-changeEmail__wrap">
      <ul class="m-changeEmail__account">
        <li class="m-changeEmail__accountItem">
          <InputBox
            icon="far fa-envelope"
            label="現在のメールアドレス"
            id="email"
            :label-content="currentEmail"
            @input="currentEmail = $event"
            input-type="email"
            :is-required="true"
            placeholder="現在のメールアドレスを入力してください"
          />
        </li>
        <li class="m-changeEmail__accountItem">
          <InputBox
            icon="far fa-envelope"
            label="新しいメールアドレス"
            id="newEmail"
            :label-content="newEmail"
            @input="newEmail = $event"
            input-type="email"
            placeholder="新しいメールアドレスを入力してください"
            :is-required="true"
          />
        </li>
        <li class="m-changeEmail__accountItem">
          <InputBox
            icon="fas fa-lock"
            label="パスワード"
            id="password"
            :label-content="password"
            @input="password = $event"
            input-type="password"
            :is-required="true"
          />
          <n-link
            class="m-changeEmail__accountHelp"
            to="newpassword"
          >
            パスワードお忘れの方はこちら
          </n-link>
        </li>
        <li class="m-changeEmail__accountItem m-changeEmail__accountItem--input">
          <input
            class="m-changeEmail__accountItemSubmit"
            :class="{'is-disabled': !password || !newEmail || !currentEmail}"
            type="button"
            value="変更する"
            @click="update"
          >
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex';

import InputBox from '~/components/elements/common/InputBox';

export default {
  components: {
    InputBox,
  },
  computed: {
    ...mapState(['device']),
  },
  data() {
    return {
      password: '',
      newEmail: '',
      currentEmail: '',
    };
  },
  methods: {
    update() {
      const { password, newEmail, currentEmail } = this;
      if (!password || !newEmail || !currentEmail) return;
      this.$emit('save-new-email', password, newEmail, currentEmail);
    },
  },
};
</script>

<style scoped lang="scss">
.m-changeEmail {
  @include m-changeEmail;
}
</style>
