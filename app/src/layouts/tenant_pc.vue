<template>
  <div class="l-pc">
    <Loading v-if="showLoadingModal" />
    <Notification
      v-if="errorMessage"
      icon="fas fa-exclamation-triangle"
      type="error"
    >
      {{ errorMessage }}
    </Notification>
    <Notification
      v-if="successMessage"
      icon="fas fa-exclamation-circle"
      type="success"
    >
      {{ successMessage }}
    </Notification>
    <TenantHeader
      class="l-pc__header"
      :class="{'l-pc__header--notLogin': !isLoggedIn}"
    />
    <div
      class="l-pc__wrapper"
      :class="{'l-pc__wrapper--notLogin': !isLoggedIn}"
    >
      <TenantSideNav
        v-if="isLoggedIn"
        class="l-pc__nav"
      />
      <nuxt class="l-pc__main" />
    </div>
    <GlobalFooter v-if="!isLoggedIn" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import TenantHeader from '~/components/elements/common/pc/TenantHeader';
import TenantSideNav from '~/components/elements/common/pc/TenantSideNav';
import GlobalFooter from '~/components/elements/common/GlobalFooter';
import Loading from '~/components/elements/common/Loading';
import Notification from '~/components/elements/common/Notification';
import notification from '~/mixins/notification';

export default {
  components: {
    TenantHeader,
    TenantSideNav,
    Loading,
    Notification,
    GlobalFooter,
  },
  mixins: [notification],
  computed: {
    ...mapState(['layout']),
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
    errorMessage() {
      return this.$store.state.layout.errorMessage;
    },
    successMessage() {
      return this.$store.state.layout.successMessage;
    },
    showLoadingModal() {
      return this.$store.state.layout.showLoadingModal;
    },
  },
};
</script>

<style lang="scss" scoped>
.l-pc {
  min-height: 100%;

  &__header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    &--notLogin {
      position: inherit;
    }
  }

  &__wrapper {
    position: fixed;
    top: 56px;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: 100%;
    min-height: calc(100vh - 56px);

    &--notLogin {
      position: inherit;
    }
  }

  &__main {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
