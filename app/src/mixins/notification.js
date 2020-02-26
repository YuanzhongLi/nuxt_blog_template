export default {
  methods: {
    closeLoadingModal() {
      this.$store.commit('layout/setLoading', {
        showLoadingModal: false,
      });
    },
    openLoadingModal() {
      this.$store.commit('layout/setLoading', {
        showLoadingModal: true,
      });
    },
    resetNotificationMessage() {
      this.$store.commit('layout/setNotificationMessage', {
        errorMessage: '',
        successMessage: '',
      });
    },
    setNotificationMessage(type, message) {
      if (type === 'error') {
        this.$store.commit('layout/setNotificationMessage', {
          errorMessage: message,
          successMessage: '',
        });
      } else if (type === 'success') {
        this.$store.commit('layout/setNotificationMessage', {
          errorMessage: '',
          successMessage: message,
        });
      }
    },
  },
};
