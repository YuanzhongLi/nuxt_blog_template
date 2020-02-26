<template>
  <div class="m-offerListModal m-offerListModal--sp">
    <div class="m-offerListModal__cnt">
      <header class="m-offerListModal__cntHead">
        <div>
          <h1 class="m-offerListModal__cntTtl">
            PDFオファー
          </h1>
          <p class="m-offerListModal__cntSub">
            テナントID：{{ targetId }}
          </p>
        </div>
        <a
          @click="handleClose"
          class="m-offerListModal__close"
        >
          <i class="fas fa-times" />
        </a>
      </header>
      <ul class="m-offerListModal__list">
        <li
          v-for="(data, index) of offers"
          class="m-offerListModal__item"
          :key="'offer-'+index"
        >
          <OfferListTable
            :data="data"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import OfferListTable from './OfferListTable';

export default {
  components: {
    OfferListTable,
  },
  props: {
    targetId: {
      type: Number,
      required: true,
    },
    offers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClose() {
      this.$emit('handle-close');
    },
  },
};
</script>

<style scoped lang="scss">
.m-offerListModal {
  @include m-offerListModal;
}
</style>
