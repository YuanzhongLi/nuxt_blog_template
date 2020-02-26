<template>
  <div class="m-recommend">
    <header class="m-recommend__head">
      <h1 class="m-recommend__headTtl">
        おすすめ物件
      </h1>
      <n-link
        class="m-recommend__headAnchor"
        to="/office/e-map"
      >
        e-Mapで見る
      </n-link>
    </header>
    <ul class="m-recommend__list">
      <li
        v-for="(data, index) in recommendAskings"
        :key="'listing-'+index"
        class="m-recommend__item"
      >
        <BuildingCell
          :building="data"
          @like="like"
          @dismiss="dismiss"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import BuildingCell from './BuildingCell';

export default {
  components: {
    BuildingCell,
  },
  props: {
    recommendAskings: {
      type: Array,
      default: () => [],
    },
    like: {
      type: Function,
      default: () => {},
    },
    dismiss: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.m-recommend {
  @include m-recommend;
}
</style>
