<template>
  <table class="a-tenantListTable">
    <thead class="a-tenantListTable__head">
      <tr>
        <th class="a-tenantListTable__headCnt">
          テナントID
        </th>
        <th
          class="a-tenantListTable__headCnt"
          colspan="8"
        >
          登録条件
        </th>
        <th class="a-tenantListTable__headCnt">
          興味あり
        </th>
        <th class="a-tenantListTable__headCnt">
          興味なし
        </th>
        <th class="a-tenantListTable__headCnt">
          オファー状況
        </th>
        <th class="a-tenantListTable__headCnt">
          チャット
        </th>
        <th class="a-tenantListTable__headCnt">
          メモ
        </th>
      </tr>
    </thead>
    <tbody class="a-tenantListTable__body">
      <template v-for="(tenant) of tenants">
        <TenantListTableRow
          :tenant="tenant"
          :key="tenant.id"
          @open-memo-modal="openMemoModal"
          @open-like-buildings-modal="openLikeBuildingsModal"
          @handle-offer-modal="handleOfferModal"
        />
        <TenantListTableRowEmployees
          :tenant="tenant"
          :key="'employees_' + tenant.id"
        />
        <TenantListTableRowArea
          :tenant="tenant"
          :key="'area_' + tenant.id"
        />
        <TenantListTableRowMovingTerm
          :tenant="tenant"
          :key="'moving_term_' + tenant.id"
        />
        <TenantListTableRowOthers
          :tenant="tenant"
          :key="'others_' + tenant.id"
        />
      </template>
    </tbody>
  </table>
</template>

<script>
import wantList from '~/mixins/wantList';
import TenantListTableRow from '~/components/elements/tenantList/pc/TenantListTableRow';
import TenantListTableRowEmployees from '~/components/elements/tenantList/pc/TenantListTableRowEmployees';
import TenantListTableRowArea from '~/components/elements/tenantList/pc/TenantListTableRowArea';
import TenantListTableRowMovingTerm from '~/components/elements/tenantList/pc/TenantListTableRowMovingTerm';
import TenantListTableRowOthers from '~/components/elements/tenantList/pc/TenantListTableRowOthers';

export default {
  components: {
    TenantListTableRow,
    TenantListTableRowEmployees,
    TenantListTableRowArea,
    TenantListTableRowMovingTerm,
    TenantListTableRowOthers,
  },
  data() {
    const { wantEquipments } = this.tenants;
    return {
      demands: {
        wantEquipments,
        TenantListTableRowEmployees,
        TenantListTableRowArea,
        TenantListTableRowOthers,
      },
    };
  },
  props: {
    tenants: {
      type: Array,
      default: () => [],
    },
  },
  mixins: [wantList],
  methods: {
    handleOfferModal(data) {
      if (data.offerCount === 0) return;
      this.$emit('handle-offer-modal', data);
    },
    openLikeBuildingsModal(tenantId, isOpen) {
      this.$emit('open-like-buildings-modal', tenantId, isOpen);
    },
    openMemoModal(tenant) {
      this.$emit('open-memo-modal', tenant);
    },
  },
};
</script>

<style lang="scss">
.a-tenantListTable {
  @include a-tenantListTable;
}
</style>
