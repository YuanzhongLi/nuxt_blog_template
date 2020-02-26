<template>
  <nav
    class="m-sideNav"
    :class="{'is-close': isClose}"
  >
    <ul v-if="isLoggedIn">
      <li>
        <SideNavItem
          to="/tenant"
          :is-active="type === 1"
          icon="home"
          :is-close="isClose"
          label="ホーム"
        />
      </li>
      <li>
        <SideNavItem
          to="/tenant/message"
          :is-active="type === 2"
          icon="message"
          :is-close="isClose"
          label="メッセージ"
        />
      </li>
      <li>
        <SideNavItem
          to="/office"
          :is-active="type === 3"
          icon="search"
          :is-close="isClose"
          label="検索"
        />
      </li>
      <li>
        <SideNavItem
          to="/office/e-map"
          :is-active="type === 4"
          icon="map"
          :is-close="isClose"
          label="e-Map"
        />
      </li>
      <li>
        <SideNavItem
          to="/tenant/mybuildings"
          :is-active="type === 5"
          icon="myBuildings"
          :is-close="isClose"
          label="物件管理"
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
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
    type() {
      const path = this.$store.state.lastVisitedPath;
      switch (true) {
        case path === '/tenant':
          return 1;
        case path === '/tenant/message':
          return 2;
        case path === '/office/e-map':
          return 4;
        case path.indexOf('/office') >= 0:
          return 3;
        case path === '/tenant/mybuildings':
          return 5;
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
      if (!this.isActive) {
        window.addEventListener('click',
          () => { this.isActive = false; },
          { once: true, capture: true });
      }
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
