<template>
  <table class="a-mybuildingsTable">
    <thead class="a-mybuildingsTable__head">
      <tr class="a-mybuildingsTable__headLine">
        <th class="a-mybuildingsTable__headCnt">
          エージェント
        </th>
        <th class="a-mybuildingsTable__headCnt">
          興味
        </th>
        <th class="a-mybuildingsTable__headCnt">
          物件名（フロア）
        </th>
        <th class="a-mybuildingsTable__headCnt">
          住所
        </th>
        <th class="a-mybuildingsTable__headCnt">
          竣工年月
        </th>
        <th class="a-mybuildingsTable__headCnt">
          面積
        </th>
        <th class="a-mybuildingsTable__headCnt">
          募集賃料（共益費込）
        </th>
        <th class="a-mybuildingsTable__headCnt">
          入居可能時期
        </th>
        <th class="a-mybuildingsTable__headCnt">
          元ファイル
        </th>
      </tr>
    </thead>
    <template v-for="offer in hasHideRow?offers.slice(0,initialLimit):offers">
      <OfferAskingTableRow
        :key="offer.id"
        :agent="offer.agent"
        :offer-id="offer.id"
        :offer-askings="offer.offerAskings"
        :talk-room-id="offer.talkRoomId"
        @offer-asking-like-by-id="offerAskingLikeById"
        @offer-asking-dislike-by-id="offerAskingDislikeById"
        @create-download-log="createDownloadLog"
      />
    </template>
    <tr
      class="a-mybuildingsTable__bodyLine"
      v-if="hasHideRow"
    >
      <td
        class="a-mybuildingsTable__bodyLineMore"
        :colspan="columnCount"
      >
        <a
          class="a-mybuildingsTable__bodyLineMoreAnchor"
          href="#"
          @click="showAll"
        >
          他の提案を見る(<span v-text="offers.length - initialLimit" />)<i class="a-mybuildingsTable__bodyLineMoreAnchorIcon fas fa-chevron-down" />
        </a>
      </td>
    </tr>
  </table>
</template>

<script>
import OfferAskingTableRow from '~/components/elements/mybuildings/pc/OfferAskingTableRow';

export default {
  components: {
    OfferAskingTableRow,
  },
  data() {
    // const ids = this.offers.id
    return {
      isClicked: {
        type: Object,
        default: () => {},
      },
      initialLimit: 1,
      isShowAll: false,
    };
  },
  props: {
    offers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    hasHideRow() {
      return !this.isShowAll && this.offers.length > this.initialLimit;
    },
    columnCount() {
      return 9;
    },
  },
  methods: {
    showAll() {
      this.isShowAll = true;
    },
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

<style scoped lang="scss">
.a-mybuildingsTable {
  @include a-mybuildingsTable;
}
</style>
