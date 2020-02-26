<template>
  <header class="m-mobileHeader">
    <h1 class="m-mobileHeader__logo a-headerLogo">
      <n-link
        v-if="isAgent"
        :to="isAgentLoggedIn ? '/agent' : '/'"
        class="a-headerLogo__anchor"
      >
        estie
      </n-link>
      <n-link
        v-else
        :to="isTenantLoggedIn ? '/tenant':'/'"
        class="a-headerLogo__anchor"
      >
        estie
      </n-link>
    </h1>
    <template v-if="isAgent">
      <n-link
        v-if="isAgentLoggedIn"
        to="/agent/info"
        class="m-mobileHeader__account"
        :style="`background-image: url(${agentData.avatarUrl});`"
      />
      <ul
        v-else
        class="m-mobileHeader__list"
      >
        <li class="m-mobileHeader__item">
          <nuxt-link
            class="m-mobileHeader__itemAnchor m-mobileHeader__itemAnchor--signup"
            to="/agent/signup"
          >
            新規登録aaaa
          </nuxt-link>
        </li>
        <li class="m-mobileHeader__item">
          <nuxt-link
            class="m-mobileHeader__itemAnchor m-mobileHeader__itemAnchor--login"
            to="/agent/login"
          >
            ログインbbbb
          </nuxt-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <n-link
        v-if="isTenantLoggedIn"
        to="/tenant/info"
        class="m-mobileHeader__account"
        :style="`background-image: url(${tenantData.avatarUrl});`"
      />
      <ul
        v-else
        class="m-mobileHeader__list"
      >
        <li class="m-mobileHeader__item">
          <nuxt-link
            class="m-mobileHeader__itemAnchor m-mobileHeader__itemAnchor--signup"
            to="/tenant/signup"
          >
            新規登録
          </nuxt-link>
        </li>
        <li class="m-mobileHeader__item">
          <nuxt-link
            class="m-mobileHeader__itemAnchor m-mobileHeader__itemAnchor--login"
            to="/tenant/login"
          >
            ログイン
          </nuxt-link>
        </li>
      </ul>
    </template>
  </header>
</template>

<script>
import { userTypeEnum } from '~/utils/enums';

export default {
  props: {
    userType: {
      type: Number,
      required: true,
    },
  },
  computed: {
    tenantData() {
      return this.$store.state.tenant.tenant;
    },
    agentData() {
      return this.$store.state.agent.agent;
    },
    isTenantLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
    isAgentLoggedIn() {
      return this.$store.state.agent.isLoggedIn;
    },
    isAgent() {
      const { userType } = this;
      return userType === userTypeEnum.AGENT;
    },
  },
};
</script>

<style scoped lang="scss">
.m-mobileHeader {
  @include m-mobileHeader;
}
</style>
