<template>
  <div class="a-selectBox">
    <label
      class="a-selectBox__label"
      :for="id"
    >
      {{ label }}
      <span
        v-if="isRequired"
        class="a-selectBox__required"
      >
        *必須
      </span>
    </label>
    <div class="a-selectBox__flex">
      <span v-if="icon">
        <i
          class="a-selectBox__icon"
          :class="icon"
        />
      </span>
      <select
        :id="id"
        :name="id"
        :value="value"
        @change="$emit('select', $event.target.value)"
        class="a-selectBox__select"
      >
        <option
          value=""
          disabled
          selected
          style="display: none;"
        >
          選択してください
        </option>
        <template
          v-if="(options instanceof Array)"
        >
          <option
            v-for="(option, index) in options"
            :value="option"
            :key="index"
          >
            {{ option }}
          </option>
        </template>
        <template
          v-else
        >
          <option
            v-for="(v, k) in options"
            :value="k"
            :key="k"
          >
            {{ v }}
          </option>
        </template>
      </select>
      <i class="a-selectBox__flexIcon fas fa-caret-down" />
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
    label: {
      type: String,
      default: '',
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    options: {
      type: [Array, Object],
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.a-selectBox {
  @include a-selectBox;
}
</style>
