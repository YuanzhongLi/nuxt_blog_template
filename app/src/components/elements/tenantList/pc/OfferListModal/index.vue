<template>
  <div class="m-offerListModal">
    <div class="m-offerListModal__cnt">
      <h1 class="m-offerListModal__cntTtl">
        PDFオファー
      </h1>
      <p class="m-offerListModal__cntSub">
        テナントID：{{ targetId }}
      </p>
      <div class="m-offerListModal__list">
        <table class="m-offerListModal__table">
          <thead>
            <tr>
              <th class="m-offerListModal__tableHead">
                興味あり
              </th>
              <th class="m-offerListModal__tableHead">
                興味なし
              </th>
              <th class="m-offerListModal__tableHead">
                提案PDF
              </th>
              <th class="m-offerListModal__tableHead">
                時間
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(data, index) of offers">
              <OfferListCell
                :data="data"
                :key="'offer-'+index"
              />
            </template>
          </tbody>
        </table>
      </div>
      <a
        @click="handleClose"
        class="m-offerListModal__close"
      >
        <i class="fas fa-times" />
      </a>
    </div>
  </div>
</template>

<script>
import OfferListCell from './OfferListCell';

export default {
  components: {
    OfferListCell,
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
