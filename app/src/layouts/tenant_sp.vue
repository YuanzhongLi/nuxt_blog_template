<template>
  <div class="l-sp">
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
    <MobileHeader :user-type="2" />
    <TenantMobileTab v-if="isLoggedIn" />
    <nuxt class="l-sp__main" />
    <MobileFooter :user-type="2" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MobileHeader from '~/components/elements/common/sp/MobileHeader';
import TenantMobileTab from '~/components/elements/common/sp/TenantMobileTab';
import MobileFooter from '~/components/elements/common/sp/Footer';
import Loading from '~/components/elements/common/Loading';
import Notification from '~/components/elements/common/Notification';
import notification from '~/mixins/notification';

export default {
  components: {
    MobileHeader,
    TenantMobileTab,
    MobileFooter,
    Loading,
    Notification,
  },
  mixins: [notification],
  computed: {
    ...mapState(['layout']),
    errorMessage() {
      return this.$store.state.layout.errorMessage;
    },
    successMessage() {
      return this.$store.state.layout.successMessage;
    },
    showLoadingModal() {
      return this.$store.state.layout.showLoadingModal;
    },
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
};
</script>
