<template>
  <tr>
    <td class="a-tenantListTable__bodyHead">
      コメント
    </td>
    <td class="a-tenantListTable__bodyCnt a-tenantListTable__bodyCnt--left">
      {{ tenant.others }}
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
