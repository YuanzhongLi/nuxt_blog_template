<template>
  <div class="a-stationSelection">
    <div
      ref="wrapper"
      class="a-stationSelection__wrapper js-suggestion"
    >
      <InputBox
        icon="fas fa-subway"
        label="希望駅"
        id="station"
        input-type="text"
        :placeholder="placeholder"
        :is-required="isRequired"
        @click="textBoxClicked"
        @cancel="clearContent"
        :label-content="labelContent.name"
        :readonly="true"
      />
      <div
        class="a-stationSelection__box"
        v-show="showList"
      >
        <input
          ref="filterTextBox"
          type="text"
          class="a-stationSelection__input"
          :placeholder="filterPlaceholder"
          v-model="filterString"
        >
        <ul
          v-if="filterString"
          class="a-stationSelection__list"
        >
          <template v-if="filteredItems.length > 0">
            <li
              class="a-stationSelection__item"
              v-for="item in filteredItems"
              :key="'item_'+(idKey ? item[idKey] : item)"
              :value="(valueKey ? item[valueKey] : item)"
              @click.stop.prevent="itemClicked(item)"
            >
              {{ textKey ? item[textKey] : item }}
            </li>
          </template>
          <li v-if="filteredItems.length === 0">
            <p class="a-stationSelection__itemTxt">
              該当する駅はありません
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import InputBox from '~/components/elements/common/InputBox';

export default {
  components: {
    InputBox,
  },
  data() {
    return {
      filterString: '',
      showList: false,
      valueKey: 'name',
      textKey: 'name',
      filterTargetKey: 'name',
      idKey: 'id',
    };
  },
  props: {
    value: {
      type: [String, Number, Boolean, Date],
      default: null,
    },
    placeholder: {
      // プレースホルダ
      type: String,
      default: '',
    },
    filterPlaceholder: {
      // フィルタリングのプレースホルダ
      type: String,
      default: '',
    },
    disabled: {
      // 入力を無効にするかどうか
      type: Boolean,
      default: false,
    },
    items: {
      // 選択肢の配列
      type: Array,
      default: () => [],
    },
    ignoreCase: {
      // フィルリングでの大文字小文字の区別
      type: Boolean,
      default: true,
    },
    labelContent: {
      type: Object,
      default: () => {},
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredItems() {
      if (!this.filterString) return this.items;
      if (!this.items || this.items.length === 0) return [];
      const flags = this.ignoreCase ? 'i' : '';
      const regexp = new RegExp(this.filterString, flags);
      return this.items.filter((x) => {
        const targetValue = this.filterTargetKey
          ? x[this.filterTargetKey]
          : JSON.stringify(x);
        return regexp.test(targetValue);
      });
    },
    selectedItem() {
      return this.items.find(
        x => this.value === (this.valueKey ? x[this.valueKey] : x),
      );
    },
    displayText() {
      const item = this.selectedItem;
      if (!item) return '';
      return this.textKey ? item[this.textKey] : item;
    },
  },
  methods: {
    textBoxClicked() {
      if (this.disabled) return;
      this.showList = !this.showList;
    },
    itemClicked(item) {
      if (item) {
        this.$emit('select-station', item);
      }
      this.reset();
    },
    reset() {
      this.showList = false;
      this.filterString = '';
    },
    clearContent() {
      this.$emit('select-station', {});
    },
  },
  watch: {
    showList(val) {
      this.$nextTick(() => {
        if (val) {
          this.$refs.filterTextBox.focus();
        }
      });
    },
  },
  mounted() {
    const $this = this;
    document.addEventListener('click', (e) => {
      const target = (e.target || e.srcElement).closest('.js-suggestion');
      if (target === $this.$refs.wrapper) return;
      $this.reset();
    });
  },
};
</script>

<style lang="scss" scoped>
.a-stationSelection {
  @include a-stationSelection;
}
</style>
