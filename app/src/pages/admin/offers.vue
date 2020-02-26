<template>
  <div class="p-main">
    <div class="main__linkLeft">
      <nuxt-link to="/admin/logout">
        ログアウトする
      </nuxt-link>
    </div>
    <div class="p-main__linkRight">
      <nuxt-link to="/admin">
        テナント一覧ページへ
      </nuxt-link>
    </div>
    <div class="p-main__linkRight">
      <nuxt-link to="/admin/agent">
        エージェント一覧ページへ
      </nuxt-link>
    </div>
    <div class="p-main__form">
      <h1 class="p-main__formTtl">
        オファー一覧
      </h1>
      <div>
        <input
          v-model="tenantId"
          type="number"
          input-type="number"
          placeholder="テナントId"
        >
        <input
          v-model="agentId"
          type="number"
          input-type="number"
          placeholder="エージェントId"
        >
        <div
          @click="search"
          class="p-main__saveBtn"
        >
          <span>検索</span>
        </div>
      </div>
    </div>
    <table class="a-tenantListTable">
      <thead class="a-tenantListTable__head">
        <tr class="a-tenantListTable__headLine">
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="1"
          >
            テナントID
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="1"
          >
            エージェントID
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            ファイル
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            テナントの反応具合
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            エージェントのコメント
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            テナントのコメント
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            作成日
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            更新日
          </th>
        </tr>
      </thead>
      <tbody
        v-if="offers.length > 0"
        class="a-tenantListTable__body"
      >
        <tr
          v-for="(offer, index) of offers"
          class="a-tenantListTable__bodyLine"
          :key="index+'-offer'"
        >
          <td class="a-tenantListTable__bodyCnt">
            {{ offer.tenantId }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ offer.agentId }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            <a
              :href="offer.pdfUrl"
              target="_blank"
            >
              PDFダウンロード
            </a>
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ tenantReaction(offer.likeStatus) }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ offer.agentComment }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ offer.tenantComment }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ bigIntToFormattedDateTime(offer.createdAt) }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ bigIntToFormattedDateTime(offer.updatedAt) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import date from '~/mixins/date';
import siteinfo from '~/mixins';
import log from '~/utils/log';
import notification from '~/mixins/notification';

export default {
  mixins: [siteinfo, notification, date],
  middleware: ['injectDevice', 'injectAdmin', 'adminAuthenticated'],
  computed: {
    ...mapState(['device', 'admin']),
  },
  created() {
    const client = this.$axios.withAccessToken(this.$store.state.adminToken);
    client
      .$get('admin/get_offer_list')
      .then((res) => {
        this.offers = res.offers;
      })
      .catch((err) => {
        log.error(err);
      });
  },
  data() {
    return {
      tenantId: '',
      agentId: '',
      offers: [],
    };
  },
  methods: {
    tenantReaction(likeStatus) {
      switch (likeStatus) {
        case 1:
          return '未反応';
        case 2:
          return '興味あり';
        case 3:
          return '興味なし';
        default:
          return '';
      }
    },
    async search() {
      const client = this.$axios.withAccessToken(this.$store.state.adminToken);
      const { offers } = await client.$get(`admin/get_offer_list/?tenantId=${this.tenantId}&agentId=${this.agentId}`);
      this.offers = offers;
    },
  },
};
</script>

<style lang="scss" scoped>
.p-main {
  @include p-main;
}

.a-tenantListTable {
  @include a-tenantListTable;
}
</style>
