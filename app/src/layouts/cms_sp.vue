<template>
  <div class="l-article">
    <header class="m-header">
      <div class="m-header__menu a-menu">
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
      <ul
        v-if="!isLoggedIn"
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
    </header>
    <nuxt />
    <MobileFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import MobileFooter from '~/components/elements/common/sp/Footer';

export default {
  components: {
    MobileFooter,
  },
  middleware: ['injectTenant'],
  computed: {
    ...mapState(['device']),
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
};
</script>

<style scoped lang="scss">
.a-menu {
  @include a-menu;
}

.m-header {
  @include m-header;
}
</style>
