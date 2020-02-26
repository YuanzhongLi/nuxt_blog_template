<template>
  <header class="m-header">
    <div
      class="m-header__menu a-menu"
      @click.prevent="closeSwitch"
    >
      <a
        v-if="isLoggedIn"
        @click="handleSideNav"
        class="a-menu__icon"
      >
        <i class="a-menu__iconCnt" />
      </a>
      <nuxt-link
        :to="isLoggedIn ? '/tenant':'/'"
      >
        <h1
          class="a-menu__logo"
          :class="{'a-menu__logo--notLogin': !isLoggedIn}"
        >
          estie
        </h1>
      </nuxt-link>
    </div>
    <Account
      v-if="isLoggedIn"
      :user="user"
      :is-active="isActive"
      @toggle-switch="toggleSwitch"
      @open-account="openAccount"
      @logout="logout"
    />
    <ul
      v-else
      class="m-header__list"
    >
      <li class="m-header__item">
        <nuxt-link
          class="m-header__itemAnchor m-header__itemAnchor--signup"
          to="/tenant/signup"
        >
          新規登録
        </nuxt-link>
      </li>
      <li class="m-header__item">
        <nuxt-link
          class="m-header__itemAnchor m-header__itemAnchor--login"
          to="/tenant/login"
        >
          ログイン
        </nuxt-link>
      </li>
    </ul>
    <n-link
      class="m-header__faq"
      to="/faq"
      target="_blank"
    >
      <i class="fas fa-question-circle" />
    </n-link>
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
      return this.$store.state.tenant.tenant;
    },
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
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
      this.$router.push('/tenant/info');
    },
    logout() {
      this.isActive = false;
      this.$router.push('/tenant/logout');
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
