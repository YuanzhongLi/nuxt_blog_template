<template>
  <div class="p-login">
    <Login
      @login="login"
      :is-tenant="true"
    />
    <FormFooter />
  </div>
</template>

<script>
import Login from '~/components/elements/login';
import FormFooter from '~/components/elements/common/FormFooter';

export default {
  components: {
    Login,
    FormFooter,
  },
  props: {
    login: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.p-login {
  @include p-login;
}
</style>
