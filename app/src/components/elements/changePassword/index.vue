<template>
  <form
    class="m-changePassword"
    :class="{'m-changePassword--sp': device.isMobile}"
  >
    <h1 class="m-changePassword__ttl">
      パスワード変更
    </h1>
    <div class="m-changePassword__wrap">
      <ul class="m-changePassword__account">
        <li class="m-changePassword__accountItem">
          <InputBox
            class="top__formInput"
            icon="fas fa-lock"
            label="現在のパスワード"
            :label-content="currentPassword"
            @input="currentPassword = $event"
            id="password"
            input-type="password"
            placeholder="半角英字と半角数字を各1文字以上含む8文字以上の文字列"
            :is-required="true"
          />
        </li>
        <li class="m-changePassword__accountItem">
          <InputBox
            class="top__formInput"
            icon="fas fa-lock"
            label="新しいパスワード"
            :label-content="newPassword"
            @input="newPassword = $event"
            id="newPassword"
            input-type="password"
            placeholder="半角英字と半角数字を各1文字以上含む8文字以上の文字列"
            :is-required="true"
          />
        </li>
        <li class="m-changePassword__accountItem">
          <InputBox
            class="top__formInput"
            icon="fas fa-lock"
            label="新しいパスワード（確認用）"
            :label-content="confirmationPassword"
            @input="confirmationPassword = $event"
            id="email"
            input-type="password"
            placeholder="半角英字と半角数字を各1文字以上含む8文字以上の文字列"
            :is-required="true"
          />
        </li>
        <li class="m-changePassword__accountItem m-changePassword__accountItem--input">
          <input
            class="m-changePassword__accountItemSubmit"
            :class="{'is-disabled': !currentPassword || !confirmationPassword || !newPassword}"
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
  middleware: 'injectDevice',
  data() {
    return {
      currentPassword: '',
      confirmationPassword: '',
      newPassword: '',
    };
  },
  methods: {
    update() {
      const { currentPassword, confirmationPassword, newPassword } = this;
      if (!currentPassword || !confirmationPassword || !newPassword) return;
      this.$emit('save-new-password', currentPassword, confirmationPassword, newPassword);
    },
  },
};
</script>

<style scoped lang="scss">
.m-changePassword {
  @include m-changePassword;
}
</style>
