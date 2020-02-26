<template>
  <div class="a-textAreaBox">
    <label
      :for="id"
      class="a-textAreaBox__label"
    >
      {{ label }}
      <span
        v-if="isRequired"
        class="a-textAreaBox__required"
      >
        *必須
      </span>
    </label>
    <textarea
      :id="id"
      class="a-textAreaBox__textarea"
      :value="labelContent"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: 'ラベル',
    },
    placeholder: {
      type: String,
      default: '入力してください',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    labelContent: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.a-textAreaBox {
  @include a-textAreaBox;
}
</style>
