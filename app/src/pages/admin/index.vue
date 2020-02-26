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
      <nuxt-link to="/admin/agent">
        エージェント一覧ページへ
      </nuxt-link>
    </div>
    <div class="p-main__form">
      <h1 class="p-main__formTtl">
        Adminページ
      </h1>
      <h2 class="p-main__formSubTtl">
        テナント一覧
      </h2>
      <a
        @click="handleOfferModal"
        class="a-tenantListTable__bodyAnchor"
      >
        agentに「テナント新規登録」の一斉送信のメールを送る
      </a>
    </div>
    <ActionToAllAgentModal
      @send="send"
      :is-open="isOpenActionToAllAgentModal"
      @close="handleOfferModal"
    />
    <DeactivateModal
      @deactivate="deactivate"
      :is-open="isOpenDeactivateModal"
      @close="handleDeactivateModal(null)"
    />
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
          <th
            class="a-tenantListTable__headCnt a-tenantListTable__headCnt--row"
            rowspan="2"
          >
            表示/非表示
          </th>
        </tr>
      </thead>
      <tbody class="a-tenantListTable__body">
        <tr
          v-for="(tenant, index) of tenants"
          class="a-tenantListTable__bodyLine"
          :key="index+'-tenant'"
        >
          <td class="a-tenantListTable__bodyCnt">
            {{ tenant.id }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ tenant.name }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ tenant.company }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            {{ tenant.email }}
          </td>
          <td class="a-tenantListTable__bodyCnt">
            <a
              v-if="tenant.type==1"
              @click="handleDeactivateModal(tenant.id)"
              class="a-tenantListTable__bodyAnchor"
            >
              非表示にする
            </a>
            <a
              v-else
              @click="handleDeactivateModal(tenant.id)"
              class="a-tenantListTable__bodyAnchor"
            >
              表示に戻す
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import siteinfo from '~/mixins';
import log from '~/utils/log';
import notification from '~/mixins/notification';
import ActionToAllAgentModal from '~/components/elements/common/modal/ActionToAllAgentModal';
import DeactivateModal from '~/components/elements/common/modal/DeactivateModal';

export default {
  layout: 'default',
  components: {
    ActionToAllAgentModal,
    DeactivateModal,
  },
  mixins: [siteinfo, notification],
  middleware: ['injectDevice', 'injectAdmin', 'adminAuthenticated'],
  computed: {
    ...mapState(['device', 'admin']),
  },
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.adminToken);
    const { tenants } = await client.$get('admin/get_tenant_list');
    return { tenants };
  },
  data() {
    return {
      isOpenActionToAllAgentModal: false,
      isOpenDeactivateModal: false,
      selectedTenantId: null,
    };
  },
  methods: {
    handleOfferModal() {
      this.isOpenActionToAllAgentModal = !this.isOpenActionToAllAgentModal;
    },
    handleDeactivateModal(tenantId) {
      this.selectedTenantId = tenantId;
      this.isOpenDeactivateModal = !this.isOpenDeactivateModal;
    },
    async checkPassword(password) {
      const client = this.$axios.withAccessToken(this.$store.state.adminToken);
      const { error } = await client.$post('auth/password/admin', {
        password,
      })
        .then((isCorrectPassword) => {
          if (!isCorrectPassword) {
            return { error: 'パスワードが違います' };
          }
          return { error: null };
        })
        .catch((err) => {
          log.error(err);
          return { error: 'エラーが発生しました' };
        });

      if (error) {
        this.closeLoadingModal();
        this.setNotificationMessage('error', error);
        return false;
      }

      return true;
    },
    async send(tenantId, password) {
      const client = this.$axios.withAccessToken(this.$store.state.adminToken);
      if (!tenantId || !password) {
        this.setNotificationMessage('error', '入力されてない項目あるで');
        return;
      }
      this.openLoadingModal();
      const isPassword = await this.checkPassword(password);
      if (!isPassword) return;

      const { error } = await client.$post('admin/send_tenantsignup_email', {
        tenantId,
      })
        .catch((err) => {
          log.error(err);
          return { error: err };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      this.setNotificationMessage('success', '一斉送信完了');
    },
    async deactivate(password) {
      const { selectedTenantId } = this;
      const client = this.$axios.withAccessToken(this.$store.state.adminToken);
      if (!password || !selectedTenantId) {
        this.setNotificationMessage('error', '入力されてない項目あるで');
        return;
      }
      this.openLoadingModal();

      const isPassword = await this.checkPassword(password);
      if (!isPassword) return;
      const { error } = await client.$post('admin/update_tenant_type', {
        tenantId: selectedTenantId,
      })
        .catch((err) => {
          log.error(err);
          return { error: err };
        });

      this.closeLoadingModal();
      if (error) {
        this.setNotificationMessage('error', error);
        return;
      }
      const { tenants } = await client.$get('admin/get_tenant_list');
      this.tenants = tenants;
      this.setNotificationMessage('success', '垢バンしました');
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
