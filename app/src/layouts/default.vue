<template>
  <div>
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
    <div>
      <nuxt />
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import Loading from '~/components/elements/common/Loading';
import Notification from '~/components/elements/common/Notification';
import notification from '~/mixins/notification';

export default {
  components: {
    Loading,
    Notification,
  },
  middleware: 'injectDevice',
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
html {
  font-size: 62.5%; /* default font size 10px */
  font-family: YakuHanJP, Helvetica, Arial, sans-serif !important;
}

body {
  margin: 0;
  background: #f4f6f9;
  color: #263442;
  font-size: 1.4rem;
  line-height: 1;
  -webkit-font-smoothing: subpixel-antialiased;
}
</style>
