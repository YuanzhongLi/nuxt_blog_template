<template>
  <div class="m-offering">
    <ul>
      <li
        v-for="(data, index) in offers"
        :key="'offer'+index"
        class="m-offering__item"
      >
        <div
          class="m-offering__ancshor m-offering__anchor--offer"
        >
          <OfferingContent
            type="offering"
            @create-download-log="createDownloadLog"
            :data="data"
          />
        </div>
      </li>
    </ul>
    <client-only>
      <infinite-loading
        ref="infiniteLoading"
        spinner="spiral"
        @infinite="addOffers"
      >
        <span
          class="m-offering__loaded"
          slot="no-results"
        >
          すべてのコンテンツを読み込みました
        </span>
        <span
          class="m-offering__loaded"
          slot="no-more"
        >
          すべてのコンテンツを読み込みました
        </span>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import OfferingContent from './OfferingContent';

export default {
  components: {
    OfferingContent,
  },
  props: {
    offers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createDownloadLog(offerId) {
      this.$emit('create-download-log', offerId);
    },
    addOffers($state) {
      this.$emit('add-offers', $state);
    },
  },
};
</script>

<style scoped lang="scss">
.m-offering {
  @include m-offering;
}

.a-offeringContent {
  @include a-offeringContent;
}
</style>
