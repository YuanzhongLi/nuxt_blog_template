<template>
  <dl class="a-settingTable">
    <dt class="a-settingTable__ttl">
      月額賃料予算
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.budget }}万円
    </dd>
    <dt class="a-settingTable__ttl">
      社員数
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.employees }}人
    </dd>
    <dt class="a-settingTable__ttl">
      希望入居時期
    </dt>
    <dd class="a-settingTable__txt">
      {{ demands.movingTerm }}
    </dd>
    <dt class="a-settingTable__ttl">
      エリア
    </dt>
    <dd class="a-settingTable__txt">
      <ul class="a-settingTable__list">
        <li
          v-for="(data, index) in demands.area"
          class="a-settingTable__listItem"
          :key="index"
        >
          {{ concatAndAddWords(data.stationName, data.timeRequired) }}
        </li>
      </ul>
    </dd>
    <dt class="a-settingTable__ttl">
      その他要望
    </dt>
    <!-- eslint-disable -->
    <!-- pre-line使っているので改行を消す -->
    <dd
      v-if="demands.others"
      class="a-settingTable__txt a-settingTable__txt--last a-settingTable__txt__otherItem"
    >{{ demands.others }}</dd>
    <!-- pre-line使っているので改行を消す -->
    <dd
      v-else
      class="a-settingTable__txt a-settingTable__txt--last a-settingTable__txt__otherItem"
    >-</dd>
    <!-- eslint-enable -->
  </dl>
</template>

<script>
import stationFilter from '~/mixins/stationFilter';

export default {
  mixins: [stationFilter],
  props: {
    demands: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.a-settingTable {
  @include a-settingTable;
}
</style>
