<template>
  <div class="a-inputBox">
    <label
      class="a-inputBox__label"
      :for="id"
    >
      {{ label }}
      <span
        v-if="isRequired"
        class="a-inputBox__required"
      >
        *必須
      </span>
    </label>
    <div class="a-inputBox__flex">
      <span>
        <i
          v-if="icon"
          class="a-inputBox__icon"
          :class="icon"
        />
      </span>
      <input
        class="a-inputBox__input"
        :type="inputType"
        :placeholder="placeholder"
        :value="labelContent"
        :id="id"
        :min="min"
        :max="max"
        @input="$emit('input', $event.target.value)"
        @click="$emit('click')"
        :readonly="readonly"
      >
      <span
        v-if="readonly"
        class="a-inputBox__clear"
      >
        <i
          class="fas fa-times-circle"
          @click="$emit('cancel')"
        />
      </span>
      <span
        v-if="unit"
        class="a-inputBox__unit"
      >
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '入力してください',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    labelContent: {
      type: [String, Number],
      default: '',
    },
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.a-inputBox {
  @include a-inputBox;
}
</style>
