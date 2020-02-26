<template>
  <div class="l-pc">
    <Loading v-if="showLoadingModal" />
    <Notification
      v-if="errorMessage"
      icon="fas fa-exclamation-triangle"
      type="error"
      :close-message="resetNotificationMessage"
    >
      {{ errorMessage }}
    </Notification>
    <Notification
      v-if="successMessage"
      icon="fas fa-exclamation-circle"
      type="success"
      :close-message="resetNotificationMessage"
    >
      {{ successMessage }}
    </Notification>
    <AgentHeader />
    <div class="l-pc__wrapper">
      <AgentSideNav />
      <nuxt class="l-pc__main" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AgentHeader from '~/components/elements/common/pc/AgentHeader';
import AgentSideNav from '~/components/elements/common/pc/AgentSideNav';
import Loading from '~/components/elements/common/Loading';
import Notification from '~/components/elements/common/Notification';
import notification from '~/mixins/notification';

export default {
  components: {
    AgentHeader,
    AgentSideNav,
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
  },
};
</script>

<style scoped>
.l-pc__header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}

.l-pc__wrapper {
  position: fixed;
  top: 56px;
  bottom: 0;
  display: flex;
  width: 100%;
}

.l-pc__main {
  flex: 1;
}
</style>
