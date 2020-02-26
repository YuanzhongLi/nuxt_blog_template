<template>
  <div class="chatForm__tenant">
    <a
      class="chatForm__tenantEdit"
      @click="onClickEdit"
      href="#"
    >
      <i class="fas fa-pen" />
      編集
    </a>
    <div class="chatForm__tenantMessage">
      <slot />です
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onClickEdit() {
      this.$emit('edit');
    },
  },
};
</script>
<style scoped lang="scss">
.chatForm {
  @include chatForm;
}
</style>
