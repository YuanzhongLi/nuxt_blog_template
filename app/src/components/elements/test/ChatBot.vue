<template>
  <div class="chatForm__bot">
    <div
      class="chatForm__botThumb"
      style="background-image: url('https://prd-estie.s3-ap-northeast-1.amazonaws.com/web/img/og.jpg');"
    />
    <div class="chatForm__botMessage">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$emit('created');
  },
};
</script>
<style scoped lang="scss">
.chatForm {
  @include chatForm;
}
</style>
