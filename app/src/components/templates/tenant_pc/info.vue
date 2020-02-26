<template>
  <div class="p-info">
    <TenantAccountInfo
      :avatar-url="avatarUrl"
      :upload-img="uploadImg"
      :current-tenant="currentTenant"
      @update-account="updateAccount"
    />
  </div>
</template>

<script>
import TenantAccountInfo from '~/components/elements/info/pc/TenantAccountInfo';

export default {
  components: {
    TenantAccountInfo,
  },
  props: {
    uploadImg: {
      type: Function,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    currentTenant: {
      type: Object,
      default: () => {},
    },
    updateAccount: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.p-info {
  @include p-info;
}
</style>
