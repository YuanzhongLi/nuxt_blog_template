<template>
  <form class="m-accountInfo">
    <h1 class="m-accountInfo__ttl">
      アカウント情報
    </h1>
    <div class="m-accountInfo__wrap">
      <div class="m-accountInfo__thumb">
        <AccountImageUploader
          :avatar-url="avatarUrl"
          @upload-img="uploadImg"
        />
      </div>
      <ul class="m-accountInfo__account">
        <li class="m-accountInfo__accountItem">
          <InputBox
            icon="fas fa-user-circle"
            label="名前"
            id="name"
            input-type="text"
            :label-content="name"
            @input="name = $event"
            placeholder="例：田中 太郎"
            :is-required="true"
          />
        </li>
        <li class="m-accountInfo__accountItem">
          <InputBox
            icon="fas fa-building"
            label="会社名"
            id="company"
            input-type="text"
            :label-content="company"
            @input="company = $event"
            placeholder="例：株式会社エスティ商事"
            :is-required="true"
          />
        </li>
        <li class="m-accountInfo__accountItem">
          <input
            class="m-accountInfo__accountItemSubmit"
            :class="{'is-disabled': !name || !company }"
            type="button"
            @click="update"
            value="変更する"
          >
        </li>
      </ul>
      <ul class="m-accountInfo__change">
        <li class="m-accountInfo__changeItem">
          <n-link
            to="/agent/change-email"
            class="m-accountInfo__changeAnchor"
          >
            <i class="m-accountInfo__changeAnchorIcon far fa-envelope" />メールアドレスの変更
          </n-link>
        </li>
        <li class="m-accountInfo__changeItem">
          <n-link
            to="/agent/change-password"
            class="m-accountInfo__changeAnchor"
          >
            <i class="m-accountInfo__changeAnchorIcon fas fa-lock" />
            パスワードの変更
          </n-link>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import InputBox from '~/components/elements/common/InputBox';
import AccountImageUploader from '~/components/elements/common/AccountImageUploader';

export default {
  components: {
    InputBox,
    AccountImageUploader,
  },
  props: {
    uploadImg: {
      type: Function,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    currentAgent: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      name: this.currentAgent.name,
      company: this.currentAgent.company,
    };
  },
  methods: {
    update() {
      if (!this.name || !this.company) return;
      this.$emit('update-account', this.name, this.company);
    },
  },
};
</script>

<style scoped lang="scss">
.m-accountInfo {
  @include m-accountInfo;
}
</style>
