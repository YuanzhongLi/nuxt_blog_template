<template>
  <div class="a-accountInfoLevel">
    <div class="a-accountInfoLevel__progress">
      <span
        class="a-accountInfoLevel__completion"
        :style="styles"
      />
    </div>
    <p class="a-accountInfoLevel__txt">
      {{ completeNum }}% 完成
    </p>
  </div>
</template>

<script>
export default {
  props: {
    completeNum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    styles() {
      return {
        'width': `${this.completeNum}%`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.a-accountInfoLevel {
  @include a-accountInfoLevel;
}
</style>
