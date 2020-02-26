<template>
  <div class="a-rangeInput">
    <CheckBox
      :value="checked"
      @input="$emit('check', $event)"
    >
      <slot />
    </CheckBox>
    <div class="a-rangeInput__range">
      <div class="a-rangeInput__rangeInput">
        <input
          type="number"
          class="a-rangeInput__rangeInputBox"
          :value="value[0]"
          @input="$emit('change',[$event.target.value, value[1]])"
        >
        <span class="a-rangeInput__rangeInputUnit">
          {{ unit }}
        </span>
      </div>
      <p class="a-rangeInput__rangeTxt">
        〜
      </p>
      <div class="a-rangeInput__rangeInput">
        <input
          type="number"
          class="a-rangeInput__rangeInputBox"
          :value="value[1]"
          @input="$emit('change',[value[0], $event.target.value])"
        >
        <span class="a-rangeInput__rangeInputUnit">
          {{ unit }}
        </span>
      </div>
    </div>
    <vue-slider
      class="a-rangeInput__slider"
      :tooltip="'none'"
      :value="value"
      :enable-cross="false"
      :contained="true"
      :dot-size="16"
      :height="6"
      :max="max"
      :min="min"
      :interval="interval"
      :marks="mark"
      :hide-label="isHideLabel"
      @change="$emit('change',$event)"
    />
  </div>
</template>

<script>
import CheckBox from '~/components/elements/common/CheckBox';

export default {
  components: {
    CheckBox,
  },
  data() {
    return {
      mark: val => (val % this.markInterval === 0 ? ({
        label: (this.isOmit ? `${val / 10000}万` : `${val}`),
      }) : false),
    };
  },
  props: {
    unit: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 100,
    },
    min: {
      type: Number,
      default: 0,
    },
    value: {
      type: Array,
      default: () => [0, 100],
    },
    checked: {
      type: Boolean,
      required: true,
    },
    interval: {
      type: Number,
      default: 0,
    },
    markInterval: {
      type: Number,
      default: 0,
    },
    isHideLabel: {
      type: Boolean,
      default: () => false,
    },
    isOmit: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped lang="scss">
.a-rangeInput {
  @include a-rangeInput;
}
</style>
