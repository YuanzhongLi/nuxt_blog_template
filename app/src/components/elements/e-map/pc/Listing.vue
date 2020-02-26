<template>
  <ul class="m-listing">
    <li
      class="m-listing__item"
      v-for="(data, index) in listings"
      :key="'listing-'+index"
      @click="selectItem(data)"
    >
      <div
        v-if="data.deleted"
        class="m-listing__itemEnd"
      >
        <p>
          <i class="m-listing__itemEndIcon fas fa-ban" />募集終了しました
        </p>
      </div>
      <BuildingCell
        :building="data"
        :is-selected="data.id===pinnedBuilding.id"
        :is-favorite="isFavorite"
        :like="like"
        :dismiss="dismiss"
      />
    </li>
  </ul>
</template>

<script>
import BuildingCell from '~/components/elements/e-map/pc/BuildingCell';

export default {
  components: {
    BuildingCell,
  },
  props: {
    listings: {
      type: Array,
      default: () => [],
    },
    pinnedBuilding: {
      type: Object,
      default: () => {},
    },
    isFavorite: {
      type: Boolean,
      default: false,
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
  methods: {
    selectItem(data) {
      if (data.deleted) return;
      this.$emit('select-item', data);
    },
  },
};
</script>

<style scoped lang="scss">
.m-listing {
  @include m-listing;
}
</style>
