<template>
  <div
    class="a-checkBox"
  >
    <input
      type="checkbox"
      id="name"
      :checked="value"
      @input="$emit('input', $event.target.checked)"
      class="a-checkBox__input"
    >
    <span class="a-checkBox__icon">
      <i class="a-checkBox__iconCnt fas fa-check" />
    </span>
    <label
      class="a-checkBox__label"
      for="name"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.a-checkBox {
  @include a-checkBox;
}
</style>
