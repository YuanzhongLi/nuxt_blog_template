<template>
  <div class="p-changeEmail">
    <section class="p-changeEmail__cnt">
      <ChangeEmail @save-new-email="saveNewEmail" />
    </section>
  </div>
</template>

<script>
import ChangeEmail from '~/components/elements/changeEmail';

export default {
  components: {
    ChangeEmail,
  },
  props: {
    saveNewEmail: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.p-changeEmail {
  @include p-changeEmail;
}
</style>
