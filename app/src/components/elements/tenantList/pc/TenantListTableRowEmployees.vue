<template>
  <tr>
    <td class="a-tenantListTable__bodyHead">
      社員数
    </td>
    <td class="a-tenantListTable__bodyCnt a-tenantListTable__bodyCnt--left">
      {{ tenant.employees }}人
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
