<template>
  <div class="p-signup p-signup--sp">
    <div class="p-signup__form">
      <!-- <SignUpChat
        v-if="false"
        :stations="stations"
        @signup="signup"
      />
       -->
      <!-- <SignUpListedForSp
        v-if="false"
        :upload-img="uploadImg"
        :avatar-url="avatarUrl"
        :stations="stations"
        @signup="signup"
        :is-simple="true"
      /> -->
      <SignUpExceptEmailForSp
        v-if="afterSignupEmail"
        :upload-img="uploadImg"
        :avatar-url="avatarUrl"
        :stations="stations"
        @signupEmailConfirm="signupEmailConfirm"
      />
      <SignUpEmail
        v-else
        @signupEmail="signupEmail"
      />
    </div>
    <FormFooter />
  </div>
</template>

<script>
// import SignUpChat from '~/components/elements/test/SignUpChat';
// import SignUpListedForSp from '~/components/elements/test/SignUpListedForSp';
import SignUpExceptEmailForSp from '~/components/elements/test/SignUpExceptEmailForSp';

import SignUpEmail from '~/components/elements/test/SignUpEmail';

import FormFooter from '~/components/elements/common/FormFooter';

import notification from '~/mixins/notification';

export default {
  components: {
    // SignUpChat,
    // SignUpListedForSp,
    SignUpEmail,
    SignUpExceptEmailForSp,
    FormFooter,
  },
  mixins: [notification],
  props: {
    stations: {
      type: Array,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    uploadImg: {
      type: Function,
      required: true,
    },
  },
  computed: {
    afterSignupEmail() {
      return this.$route.query.token;
    },
  },
  methods: {
    signup(values) {
      this.$emit('signup', values);
    },
    updateArea(area) {
      this.area = area;
    },
    signupEmail(values) {
      this.$emit('signupEmail', values);
    },
    signupEmailConfirm(values) {
      this.$emit('signupEmailConfirm', values);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-signup {
  @include p-signup;
}
</style>
