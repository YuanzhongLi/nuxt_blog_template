<template>
  <header class="m-header">
    <div
      class="m-header__menu a-menu"
      @click.prevent="closeSwitch"
    >
      <a
        @click="handleSideNav"
        class="a-menu__icon"
      >
        <i class="a-menu__iconCnt" />
      </a>
      <nuxt-link
        to="/agent"
      >
        <h1 class="a-menu__logo">
          estie
        </h1>
      </nuxt-link>
    </div>
    <Account
      :user="user"
      :is-active="isActive"
      @toggle-switch="toggleSwitch"
      @open-account="openAccount"
      @logout="logout"
    />
  </header>
</template>

<script>
import Account from '~/components/elements/common/Account';

export default {
  components: {
    Account,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.agent.agent;
    },
  },
  methods: {
    handleSideNav() {
      const isOpen = this.$store.state.layout.isSideNavOpen;
      this.$store.commit('layout/setSideNavOpen', { isSideNavOpen: !isOpen });
    },
    toggleSwitch() {
      this.isActive = !this.isActive;
    },
    closeSwitch() {
      this.isActive = false;
    },
    openAccount() {
      this.isActive = false;
      this.$router.push('/agent/info');
    },
    logout() {
      this.isActive = false;
      this.$router.push('/agent/logout');
    },
  },
};
</script>

<style scoped lang="scss">
.m-header {
  @include m-header;
}

.a-menu {
  @include a-menu;
}
</style>
