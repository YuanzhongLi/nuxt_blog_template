<template>
  <div class="a-accountInfo">
    <div
      class="a-accountInfo__thumb"
      :style="`background-image: url(${user.avatarUrl});`"
    />
    <div class="a-accountInfo__cnt">
      <span
        v-if="user && user.company"
        class="a-accountInfo__company"
      >
        {{ user.company }}
      </span>
      <p
        v-if="user && user.name"
        class="a-accountInfo__name"
      >
        {{ user.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.tenant.tenant;
    },
  },
};
</script>

<style scoped lang="scss">
.a-accountInfo {
  @include a-accountInfo;
}
</style>
