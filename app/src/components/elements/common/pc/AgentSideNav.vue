<template>
  <nav
    class="m-sideNav"
    :class="{'is-close': isClose}"
  >
    <ul>
      <li>
        <SideNavItem
          to="/agent"
          :is-active="type === 1"
          icon="tenantList"
          :is-close="isClose"
          label="テナントリスト"
        />
      </li>
      <li>
        <SideNavItem
          to="/agent/offer"
          :is-active="type === 2"
          icon="offer"
          :is-close="isClose"
          label="オファー"
        />
      </li>
      <li>
        <SideNavItem
          to="/agent/message"
          :is-active="type === 3"
          icon="message"
          :is-close="isClose"
          label="メッセージ"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
import SideNavItem from '~/components/elements/common/SideNavItem';

export default {
  components: {
    SideNavItem,
  },
  props: {
    icon: {
      type: String,
      default: '',
    },
  },
  computed: {
    isClose() {
      return !this.$store.state.layout.isSideNavOpen;
    },
    type() {
      const path = this.$store.state.lastVisitedPath;
      switch (path) {
        case '/agent':
          return 1;
        case '/agent/offer':
          return 2;
        case '/agent/message':
          return 3;
        default:
          return 0;
      }
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleSwitch() {
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style scoped lang="scss">
.m-sideNav {
  @include m-sideNav;
}
</style>
