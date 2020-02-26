<template>
  <li
    :key="tenant.id+'-tenant'"
    class="m-tenantListItem__infoCntItem"
  >
    <h3 class="m-tenantListItem__infoSubTtl"
      v-text="label"
    />
    <p class="m-tenantListItem__infoCntTxt"
      v-text="value"
    />
  </li>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped lang="scss">
.m-tenantListItem {
  @include m-tenantListItem;
}
</style>
