<template>
  <n-link
    :to="`${to}`"
    class="a-sideNavItem"
    :class="{'is-active': isActive, 'is-close': isClose}"
  >
    <div class="a-sideNavItem__cnt">
      <span
        class="a-sideNavItem__icon"
        :class="`a-sideNavItem__icon--${icon}`"
      />
      <p
        v-if="!isClose"
        class="a-sideNavItem__txt"
      >
        {{ label }}
        <!-- <span class="a-sideNavItem__notification">
          99+
        </span> -->
      </p>
    </div>
  </n-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isClose: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
.a-sideNavItem {
  @include a-sideNavItem;
}
</style>
