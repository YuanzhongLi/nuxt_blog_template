<template>
  <ul class="m-tenantList">
    <li
      v-for="(tenant) of tenants"
      :key="tenant.id+'-tenant'"
      class="m-tenantList__item"
    >
      <TenantListItem
        :tenant="tenant"
        @open-like-buildings-modal="openLikeBuildingsModal"
        @handle-offer-modal="handleOfferModal"
        @open-memo-modal="openMemoModal"
      />
    </li>
  </ul>
</template>

<script>
import TenantListItem from '~/components/elements/tenantList/sp/TenantListItem';

export default {
  components: {
    TenantListItem,
  },
  props: {
    tenants: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleOfferModal(tenantId) {
      this.$emit('handle-offer-modal', tenantId);
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

<style scoped lang="scss">
.m-tenantList {
  @include m-tenantList;
}
</style>
