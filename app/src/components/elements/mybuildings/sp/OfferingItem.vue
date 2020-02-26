<template>
  <div class="a-askingCard">
    <table class="a-askingCard__table">
      <thead>
        <tr>
          <th
            class="a-askingCard__tableHead"
            colspan="2"
          >
            <div class="a-askingCard__tableHeadCnt">
              <span class="a-askingCard__tableHeadInfo">
                <h1 class="a-askingCard__tableHeadTtl">
                  {{ offerAsking.name }}({{ offerAsking.askingFloor }}F)
                </h1>
                <a
                  :href="url"
                  @click="createDownloadLog"
                  class="a-askingCard__tableHeadAnchor"
                  target="_blank"
                >
                  <i class="a-askingCard__tableHeadAnchorIcon fas fa-file-pdf" />PDF
                </a>
              </span>
              <span
                class="a-askingCard__tableHeadThumb"
                :style="`background-image: url(${agent.avatarUrl});`"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="a-askingCard__tableBodyCnt">
            住所
          </td>
          <td class="a-askingCard__tableBodyCnt a-askingCard__tableBodyCnt--right">
            <span class="a-askingCard__tableBodyCntTxt">
              {{ offerAsking.address }}
            </span>
            <span class="a-askingCard__tableBodyCntTxt">
              {{ offerAsking.nearestStation }}
            </span>
          </td>
        </tr>
        <tr>
          <td class="a-askingCard__tableBodyCnt">
            竣工年月
          </td>
          <td class="a-askingCard__tableBodyCnt a-askingCard__tableBodyCnt--right">
            {{ offerAsking.completedOn | formatYearAndMonth }}
          </td>
        </tr>
        <tr>
          <td class="a-askingCard__tableBodyCnt">
            面積
          </td>
          <td class="a-askingCard__tableBodyCnt a-askingCard__tableBodyCnt--right">
            {{ askingAreaAddUnitTwoPaterns(offerAsking.askingArea) }}
          </td>
        </tr>
        <tr>
          <td class="a-askingCard__tableBodyCnt">
            募集賃料（共益費込）
          </td>
          <td class="a-askingCard__tableBodyCnt a-askingCard__tableBodyCnt--right">
            {{ offerAsking.totalRent ? `${offerAsking.totalRent.toLocaleString()}円/坪（推定）` : '未定' }}
          </td>
        </tr>
        <tr>
          <td class="a-askingCard__tableBodyCnt a-askingCard__tableBodyCnt--last">
            入居可能時期
          </td>
          <td class="a-askingCard__tableBodyCnt a-askingCard__tableBodyCnt--last a-askingCard__tableBodyCnt--right">
            {{ offerAsking.strContractStart }}
          </td>
        </tr>
      </tbody>
    </table>
    <ul class="a-askingCard__action">
      <li class="a-askingCard__actionItem">
        <a
          class="a-askingCard__actionAnchor a-askingCard__actionAnchor--fav"
          @click.prevent="offerAskingLikeById(offerAsking.id)"
        >
          <i class="a-askingCard__actionIcon fas fa-heart" />興味あり
        </a>
      </li>
      <li class="a-askingCard__actionItem">
        <a
          class="a-askingCard__actionAnchor a-askingCard__actionAnchor--dismiss"
          @click.prevent="offerAskingDislikeById(offerAsking.id)"
        >
          <i class="a-askingCard__actionIcon fas fa-times" />
          興味なし
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import askingArea from '~/mixins/askingArea';
import date from '~/mixins/date';

export default {
  mixins: [askingArea, date],
  props: {
    agent: {
      type: Object,
      required: true,
    },
    offerId: {
      type: Number,
      required: true,
    },
    offerAsking: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    total() {
      return `全${this.offerAskings.length}件`;
    },
    columnCount() {
      return 9;
    },
    summaryRowCount() {
      return this.offerAskings.length;
    },
  },
  methods: {
    getRowKey(index) {
      return `offerAskingTableRow_${index}`;
    },
    isShowSummaryColumn(index) {
      return index === 0;
    },
    offerAskingLikeById(id) {
      this.$emit('offer-asking-like-by-id', id);
    },
    offerAskingDislikeById(id) {
      this.$emit('offer-asking-dislike-by-id', id);
    },
    createDownloadLog() {
      this.$emit('create-download-log', this.offerId);
    },
  },
  data() {
    return {
      url: '',
    };
  },
  created() {
    const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
    client
      .post('tenant/s3_signed_url', {
        id: this.offerId,
        type: 'tenant',
      })
      .then((res) => {
        this.url = res.data;
      });
  },
};
</script>

<style scoped lang="scss">
.a-askingCard {
  @include a-askingCard;
}
</style>
