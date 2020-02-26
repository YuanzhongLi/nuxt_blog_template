<template>
  <div class="p-main">
    <div class="main__linkLeft">
      <nuxt-link to="/admin/logout">
        ログアウトする
      </nuxt-link>
    </div>
    <div class="p-main__linkRight">
      <nuxt-link to="/admin/invite">
        ユーザーを招待する
      </nuxt-link>
    </div>
    <div class="p-main__linkRight">
      <nuxt-link to="/admin/offers">
        オファー一覧を見る
      </nuxt-link>
    </div>
    <div class="p-main__linkRight">
      <nuxt-link to="/admin">
        テナント一覧ページへ
      </nuxt-link>
    </div>
    <div class="p-main__form">
      <h1 class="p-main__formTtl">
        Adminページ
      </h1>
      <h2 class="p-main__formSubTtl">
        エージェント一覧
      </h2>
    </div>
    <table class="a-tenantListTable">
      <thead class="a-tenantListTable__head">
        <tr class="a-tenantListTable__headLine">
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
            名前
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            会社名
          </th>
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            Email
          </th>
        </tr>
      </thead>
      <tbody class="a-tenantListTable__body">
        <tr
          v-for="(agent, index) of agents"
          class="a-tenantListTable__bodyLine"
          :key="index+'-agent'"
        >
          <td class="a-tenantListTable__bodyCnt">
            {{ agent.id }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ agent.name }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ agent.company }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ agent.email }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';

export default {
  layout: 'default',
  mixins: [siteinfo, notification],
  middleware: ['injectDevice', 'injectAdmin', 'adminAuthenticated'],
  computed: {
    ...mapState(['device', 'admin']),
  },
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.adminToken);
    const { agents } = await client.$get('admin/get_agent_list');
    return { agents };
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    handleOfferModal() {
      this.isOpen = !this.isOpen;
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
