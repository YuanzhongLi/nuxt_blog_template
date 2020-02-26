export default {
  computed: {
    roomIsActive() {
      if (!this.tenant.talkRoom || !this.tenant.talkRoom[0]) {
        return false;
      }
      return this.tenant.talkRoom[0].isActive === 1;
    },
  },
};
