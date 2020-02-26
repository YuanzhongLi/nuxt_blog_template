<template>
  <section class="p-mybuildings">
    <div
      v-if="offers.length"
      class="p-mybuildings__cnt"
    >
      <h1 class="p-mybuildings__ttl">
        オファー物件
      </h1>
      <p class="p-mybuildings__explain">
        PDFでエージェントからオファーされた物件リストです。興味あり／なしを選択してください
      </p>
      <OfferAskingTable
        class="p-mybuildings__table"
        :offers="offers"
        @offer-asking-like-by-id="offerAskingLikeById"
        @offer-asking-dislike-by-id="offerAskingDislikeById"
        @create-download-log="createDownloadLog"
      />
    </div>
    <div
      v-if="askings.length"
      class="p-mybuildings__cnt"
    >
      <h1 class="p-mybuildings__ttl">
        興味あり
      </h1>
      <p class="p-mybuildings__explain">
        物件検索やe-Mapで「興味あり」した物件リストです
      </p>
      <LikeAskingTable
        class="p-mybuildings__table"
        :askings="askings"
        :dismiss="dismiss"
      />
    </div>
    <div
      v-if="!offers.length && !askings.length"
      class="p-mybuildings__empty"
    >
      <i class="p-mybuildings__emptyIcon far fa-folder-open" />
      <p class="p-mybuildings__emptyTxt">
        表示する物件がありません
      </p>
    </div>
  </section>
</template>

<script>
import OfferAskingTable from '~/components/elements/mybuildings/pc/OfferAskingTable';
import LikeAskingTable from '~/components/elements/mybuildings/pc/LikeAskingTable';

export default {
  components: {
    OfferAskingTable,
    LikeAskingTable,
  },
  props: {
    offers: {
      type: Array,
      required: true,
      default: () => [],
    },
    askings: {
      type: Array,
      required: true,
      default: () => [],
    },
    dismiss: {
      type: Function,
      required: true,
    },
  },
  methods: {
    offerAskingLikeById(id) {
      this.$emit('offer-asking-like-by-id', id);
    },
    offerAskingDislikeById(id) {
      this.$emit('offer-asking-dislike-by-id', id);
    },
    createDownloadLog(offerId) {
      this.$emit('create-download-log', offerId);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-mybuildings {
  @include p-mybuildings;
}
</style>
