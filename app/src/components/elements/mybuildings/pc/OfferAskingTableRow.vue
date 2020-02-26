<template>
  <tbody class="a-mybuildingsTable__body">
    <tr v-if="summaryRowCount===0">
      <td
        class="a-mybuildingsTable__bodyCnt"
        rowspan="1"
      >
        <div
          @click="clicked"
          class="a-mybuildingsTable__bodyCntThumb"
          :style="`background-image: url(${agent.avatarUrl});`"
        >
          <i class="a-mybuildingsTable__bodyCntThumbIcon fas fa-reply" />
        </div>
      </td>
      <td
        class="a-mybuildingsTable__bodyCnt"
        colspan="7"
      >
        集計中です。集計結果は数日で反映されます
      </td>
      <td
        class="a-mybuildingsTable__bodyCnt"
        :rowspan="summaryRowCount"
      >
        <a
          :href="url"
          class="a-mybuildingsTable__bodyCntBtn"
          target="_blank"
        >
          <i class="a-mybuildingsTable__bodyCntBtnIcon fas fa-file-pdf" />PDF
        </a>
      </td>
    </tr>
    <tr
      v-else
      class="a-mybuildingsTable__bodyLine"
      v-for="(offerAsking, index) in offerAskings"
      :key="getRowKey(index)"
    >
      <td
        class="a-mybuildingsTable__bodyCnt"
        v-if="isShowSummaryColumn(index)"
        :rowspan="summaryRowCount"
      >
        <div
          @click="clicked"

          class="a-mybuildingsTable__bodyCntThumb"
          :style="`background-image: url(${agent.avatarUrl});`"
        >
          <i class="a-mybuildingsTable__bodyCntThumbIcon fas fa-reply" />
        </div>
      </td>
      <td class="a-mybuildingsTable__bodyCnt">
        <ul class="a-mybuildingsTable__bodyInterest">
          <li class="a-mybuildingsTable__bodyInterestItem">
            <a
              :class="{'is-active': offerAsking.likeStatus === 1 }"
              class="a-mybuildingsTable__bodyInterestAnchor a-mybuildingsTable__bodyInterestAnchor--fav"
              @click.prevent="offerAsking.likeStatus !== 1 ? offerAskingLikeById(offerAsking.id) : ''"
            >
              <i class="a-mybuildingsTable__bodyInterestIcon a-mybuildingsTable__bodyInterestIcon--fav fas fa-heart" />
              <div class="a-mybuildingsTable__bodyInterestGuide">
                <span class="a-mybuildingsTable__bodyInterestGuideTxt">
                  興味ありをするとエージェントとチャットが始まります
                </span>
              </div>
            </a>
          </li>
          <li class="a-mybuildingsTable__bodyInterestItem">
            <a
              :class="{'is-active': offerAsking.likeStatus === 0 }"
              class="a-mybuildingsTable__bodyInterestAnchor a-mybuildingsTable__bodyInterestAnchor--ignore"
              @click.prevent="offerAsking.likeStatus !== 0 ? offerAskingDislikeById(offerAsking.id) : ''"
            >
              <i class="a-mybuildingsTable__bodyInterestIcon a-mybuildingsTable__bodyInterestIcon--dismiss fas fa-times" />
            </a>
          </li>
        </ul>
      </td>
      <td class="a-mybuildingsTable__bodyCnt a-mybuildingsTable__bodyCnt--left">
        {{ offerAsking.name }}({{ offerAsking.askingFloor }})
      </td>
      <td class="a-mybuildingsTable__bodyCnt a-mybuildingsTable__bodyCnt--left">
        {{ offerAsking.address }}
        <ul class="a-mybuildingsTable__bodyCntList">
          <li>
            {{ offerAsking.nearestStation }}
          </li>
        </ul>
      </td>
      <template
        v-if="!offerAsking.isServiceOffice"
      >
        <td class="a-mybuildingsTable__bodyCnt">
          {{ offerAsking.completedOn | formatYearAndMonth }}
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          {{ askingAreaAddUnit(offerAsking.askingArea) }}<br><span class="a-mybuildingsTable__bodyCntSub">{{ askingAreaSqAddUnit(offerAsking.askingArea) }}</span>
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          {{ offerAsking.askingRent ? offerAsking.askingRent.toLocaleString() + '円/坪' : '未定' }} <br><span class="a-mybuildingsTable__bodyCntSub" />
        </td>
        <td class="a-mybuildingsTable__bodyCnt">
          {{ offerAsking.strContractStart }}
        </td>
      </template>
      <td
        v-else
        colspan="4"
        class="a-mybuildingsTable__bodyCnt"
      >
        PDFを御覧ください
      </td>
      <td
        class="a-mybuildingsTable__bodyCnt"
        v-if="isShowSummaryColumn(index)"
        :rowspan="summaryRowCount"
      >
        <a
          :href="url"
          @click="createDownloadLog"
          class="a-mybuildingsTable__bodyCntBtn"
          target="_blank"
        >
          <i class="a-mybuildingsTable__bodyCntBtnIcon fas fa-file-pdf" />PDF
        </a>
      </td>
    </tr>
  </tbody>
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
    talkRoomId: {
      type: Number,
      required: true,
    },
    offerAskings: {
      type: Array,
      default: () => [],
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
    clicked(e) {
      this.$router.push(`/tenant/message?roomId=${this.talkRoomId}`);
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
.a-mybuildingsTable {
  @include a-mybuildingsTable;
}
</style>
