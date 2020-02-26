<template>
  <table class="a-offerListTable">
    <tbody>
      <tr>
        <th class="a-offerListTable__head">
          興味あり
        </th>
        <td class="a-offerListTable__body">
          <ul v-if="uniqueLikeBuildingNames.length">
            <li
              class="a-offerListTable__bodyItem"
              v-for="(likeBuildingName, index) of uniqueLikeBuildingNames"
              :key="'unique-like'+index"
            >
              {{ likeBuildingName }}
            </li>
          </ul>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="a-offerListTable__head">
          興味なし
        </th>
        <td class="a-offerListTable__body">
          <ul v-if="uniqueDisLikeBuildingNames.length">
            <li
              class="a-offerListTable__bodyItem"
              v-for="(disLikeBuildingName, index) of uniqueDisLikeBuildingNames"
              :key="'unique-like'+index"
            >
              {{ disLikeBuildingName }}
            </li>
          </ul>
          <template v-else>
            -
          </template>
        </td>
      </tr>
      <tr>
        <th class="a-offerListTable__head">
          PDF
        </th>
        <td class="a-offerListTable__body">
          <a
            class="a-offerListTable__anchor"
            :href="`${url}`"
            target="_blank"
          >
            <i class="a-offerListCell__anchorIcon far fa-file-pdf" />
            <span>PDF</span>
          </a>
        </td>
      </tr>
      <tr>
        <th class="a-offerListTable__head">
          提案時間
        </th>
        <td class="a-offerListTable__body">
          <time>
            {{ bigIntToFormattedDateTime(data.createdAt) }}
          </time>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import date from '~/mixins/date';
import log from '~/utils/log';
import offerListCell from '~/mixins/offerListCell';

export default {
  data() {
    return {
      url: '',
    };
  },
  mixins: [date, offerListCell],
  created() {
    try {
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      client
        .post('tenant/s3_signed_url', {
          id: this.data.id,
          type: 'agent',
        })
        .then((res) => {
          this.url = res.data;
        });
    } catch (err) {
      log.error(err);
    }
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.a-offerListTable {
  @include a-offerListTable;
}
</style>
