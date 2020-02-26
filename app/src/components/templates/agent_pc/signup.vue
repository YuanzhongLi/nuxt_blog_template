<template>
  <div class="p-signup">
    <p class="p-signup__agent">
      <span class="p-signup__agentCnt">
        for エージェント
      </span>
    </p>
    <form class="p-signup__form">
      <h1 class="p-signup__formTtl">
        新規登録
      </h1>
      <ul class="p-signup__list">
        <li class="p-signup__item p-signup__item--flex">
          <AccountImageUploader
            class="p-signup__itemAccount"
            :avatar-url="avatarUrl"
            @upload-img="uploadImg"
          />
          <div class="p-signup__itemAccountCnt">
            <InputBox
              class="p-signup__itemAccountCntInput"
              icon="fas fa-user-circle"
              label="名前"
              id="name"
              :label-content="name"
              @input="name = $event"
              input-type="text"
              placeholder="例：山田 太郎"
              :is-required="true"
            />
            <InputBox
              class="p-signup__itemAccountCntInput"
              icon="far fa-envelope"
              label="メールアドレス"
              id="mail"
              :label-content="email"
              @input="email = $event"
              input-type="text"
              placeholder="例：taro-yamada@estie.co.jp"
              :is-required="true"
            />
          </div>
        </li>
        <li class="p-signup__item">
          <InputBox
            icon="fas fa-building"
            label="会社名"
            id="company"
            :label-content="company"
            @input="company = $event"
            input-type="text"
            placeholder="例：株式会社エスティ商事"
            :is-required="true"
          />
        </li>
        <li class="p-signup__item p-signup__item--flex">
          <InputBox
            class="p-signup__item--flexCnt"
            icon="fas fa-lock"
            label="パスワード"
            id="password"
            input-type="password"
            @input="password = $event"
            :label-content="password"
            placeholder="半角英数字8文字以上"
            :is-required="true"
          />
          <InputBox
            class="p-signup__item--flexCnt"
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
      <div class="p-signup__check">
        <CheckBox
          :value="termConsented"
          @input="consentTerm"
        />
        <a
          href="/terms"
          target="_blank"
          class="p-signup__checkAnchor"
        >
          利用規約
        </a>
        と
        <a
          href="/privacy"
          target="_blank"
          class="p-signup__checkAnchor"
        >
          プライバシーポリシー
        </a>
        に同意する
      </div>
      <div class="p-signup__save">
        <button
          class="p-signup__saveBtn"
          @click.prevent="signup"
        >
          新規登録
        </button>
      </div>
      <ul class="p-signup__formFooter">
        <li>
          <n-link
            class="p-signup__textAnchor"
            to="newpassword"
          >
            パスワードの再発行
          </n-link>
        </li>
        <li>
          <n-link
            class="p-signup__textAnchor"
            to="login"
          >
            ログイン
          </n-link>
        </li>
      </ul>
    </form>
    <FormFooter />
  </div>
</template>

<script>
import CheckBox from '~/components/elements/common/CheckBox';
import InputBox from '~/components/elements/common/InputBox';
import AccountImageUploader from '~/components/elements/common/AccountImageUploader';
import FormFooter from '~/components/elements/common/FormFooter';
import notification from '~/mixins/notification';

export default {
  components: {
    CheckBox,
    InputBox,
    AccountImageUploader,
    FormFooter,
  },
  props: {
    avatarUrl: {
      type: String,
      default: '',
    },
    uploadImg: {
      type: Function,
      required: true,
    },
  },
  mixins: [notification],
  data() {
    return {
      name: '',
      company: '',
      email: '',
      password: '',
      confirmPassword: '',
      termConsented: false,
    };
  },
  methods: {
    signup() {
      const {
        name,
        company,
        email,
        password,
        confirmPassword,
        termConsented,
      } = this;
      if (!termConsented) {
        this.setNotificationMessage('error', '利用規約に同意してください');
        return;
      }
      if (!name || !email || !company || !password || !confirmPassword) {
        this.setNotificationMessage('error', '記入していない必須項目があります');
        return;
      }
      this.$emit('signup', name, email, company, password, confirmPassword);
    },
    consentTerm(checked) {
      this.termConsented = checked;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-signup {
  @include p-signup;
}
</style>
