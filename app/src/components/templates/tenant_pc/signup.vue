<template>
  <div class="p-signup">
    <form class="p-signup__form">
      <!-- <SignUpChat
        v-if="false"
        :stations="stations"
        @signup="signup"
      /> -->
      <!-- <SignUpListed
        v-if="false"
        :upload-img="uploadImg"
        :avatar-url="avatarUrl"
        :stations="stations"
        @signup="signup"
        :is-simple="true"
      /> -->
      <SignUpExceptEmail
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
    </form>
    <FormFooter />
  </div>
</template>

<script>
// import SignUpChat from '~/components/elements/test/SignUpChat';
// import SignUpListed from '~/components/elements/test/SignUpListed';
import SignUpExceptEmail from '~/components/elements/test/SignUpExceptEmail';
import SignUpEmail from '~/components/elements/test/SignUpEmail';

import FormFooter from '~/components/elements/common/FormFooter';
import notification from '~/mixins/notification';

export default {
  components: {
    // SignUpChat,
    // SignUpListed,
    SignUpExceptEmail,
    SignUpEmail,
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
    signupEmail(values) {
      this.$emit('signupEmail', values);
    },
    signupEmailConfirm(values) {
      this.$emit('signupEmailConfirm', values);
    },
    updateArea(area) {
      this.area = area;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-signup {
  @include p-signup;
}

.chatForm {
  @include chatForm;
}
</style>
