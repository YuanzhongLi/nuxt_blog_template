<template>
  <div>
    <AgentSP
      v-if="device.isMobile"
      @handle-offer-modal="handleOfferModal"
      :target-id="targetId"
      :offers="offers"
      :tenants="tenants"
      :buildings="buildings"
      @save-memo="saveMemo"
      @open-like-buildings-modal="openLikeBuildingsModal"
    />
    <AgentPC
      v-else
      @handle-offer-modal="handleOfferModal"
      @search-tenant-list="searchTenantList"
      :target-id="targetId"
      :offers="offers"
      :tenants="tenants"
      :buildings="buildings"
      @save-memo="saveMemo"
      @open-like-buildings-modal="openLikeBuildingsModal"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import AgentPC from '~/components/templates/agent_pc';
import AgentSP from '~/components/templates/agent_sp';
import log from '~/utils/log';

export default {
  layout: ctx => (ctx.isMobile ? 'agent_sp' : 'agent_pc'),
  components: {
    AgentPC,
    AgentSP,
  },
  middleware: ['injectDevice', 'injectAgent', 'agentAuthenticated'],
  mixins: [siteinfo, notification, webpush],
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.agentToken);
    const tenants = await client.$get('agent/get_tenant_list');
    return tenants;
  },
  computed: {
    ...mapState(['device', 'agent']),
  },
  data() {
    return {
      targetId: 0,
      offers: [],
      tenants: [],
      buildings: [],
    };
  },
  methods: {
    async handleOfferModal(tenantId) {
      if (this.targetId !== tenantId) {
        this.resetNotificationMessage();
        this.openLoadingModal();
        const client = this.$axios.withAccessToken(this.$store.state.agentToken);
        const { offers, error } = await client.$get(`agent/get_tenant_offers/${tenantId}`)
          .catch((err) => {
            log.error(error);
            return { tenants: [], error: '正しいIDを指定して下さい' };
          });
        if (error) {
          this.setNotificationMessage('error', 'サーバーエラーです');
          this.offers = [];
        }
        this.closeLoadingModal();
        this.offers = offers;
        this.targetId = tenantId;
      }
    },
    async searchTenantList(tenantId) {
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      const { tenants, error } = await client.$get(`agent/get_tenant_list/?tenantId=${tenantId}`)
        .catch((err) => {
          log.error(error);
          return { tenants: [], error: '正しいIDを指定して下さい' };
        });
      if (error) {
        this.setNotificationMessage('error', error);
        this.tenants = [];
        return;
      }
      this.tenants = tenants;
    },
    async openLikeBuildingsModal(tenantId, isLike) {
      if (this.targetId !== tenantId) {
        this.resetNotificationMessage();
        this.openLoadingModal();
        const client = this.$axios.withAccessToken(this.$store.state.agentToken);
        const { buildings } = await client.$get(`askings/tenant_reaction/?tenantId=${tenantId}&isLike=${isLike}`);
        this.buildings = buildings;
        this.closeLoadingModal();
      }
    },
    async saveMemo(memo, resolve) {
      const client = this.$axios.withAccessToken(this.$store.state.agentToken);
      this.resetNotificationMessage();
      this.openLoadingModal();
      if (memo.id) {
        const { error1 } = await client.$post('agent/update_memo', {
          memoId: memo.id,
          content: memo.content,
        }).catch((err) => {
          log.error(err);
          return { error1: err };
        });
        if (error1) {
          this.setNotificationMessage('error', '登録に失敗しました');
          return;
        }
      } else {
        const { error2 } = await client.$post('agent/create_memo', {
          tenantId: memo.tenantId,
          content: memo.content,
        }).catch((err) => {
          log.error(err);
          return { error2: err };
        });
        if (error2) {
          this.setNotificationMessage('error', '登録に失敗しました');
          return;
        }
      }
      const { tenants } = await client.$get('agent/get_tenant_list');
      this.tenants = tenants;
      this.closeLoadingModal();
      resolve();
    },
  },
};
</script>
