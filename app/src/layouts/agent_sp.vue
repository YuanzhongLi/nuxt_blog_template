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
    <MobileHeader :user-type="1" />
    <AgentMobileTab v-if="isLoggedIn" />
    <nuxt class="l-sp__main" />
    <MobileFooter :user-type="1" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MobileHeader from '~/components/elements/common/sp/MobileHeader';
import AgentMobileTab from '~/components/elements/common/sp/AgentMobileTab';
import MobileFooter from '~/components/elements/common/sp/Footer';
import Loading from '~/components/elements/common/Loading';
import Notification from '~/components/elements/common/Notification';
import notification from '~/mixins/notification';

export default {
  components: {
    MobileHeader,
    AgentMobileTab,
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
      return this.$store.state.agent.isLoggedIn;
    },
  },
};
</script>
