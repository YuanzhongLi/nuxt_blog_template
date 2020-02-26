<template>
  <tr>
    <td class="a-tenantListTable__bodyHead">
      入居時期
    </td>
    <td class="a-tenantListTable__bodyCnt a-tenantListTable__bodyCnt--left">
      {{ tenant.movingTerm }}
    </td>
  </tr>
</template>

<script>

export default {
  props: {
    tenant: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
