<template>
  <div class="p-changePassword">
    <section class="p-changePassword__cnt">
      <ChangePassword @save-new-password="saveNewPassword" />
    </section>
  </div>
</template>

<script>
import ChangePassword from '~/components/elements/changePassword';

export default {
  components: {
    ChangePassword,
  },
  props: {
    saveNewPassword: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.p-changePassword {
  @include p-changePassword;
}
</style>
