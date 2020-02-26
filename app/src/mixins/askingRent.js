export default {
  computed: {
    judgeAskingRent() {
      if (this.asking.askingRent) {
        return `${this.asking.askingRent.toLocaleString()}円/坪`;
      }
      if (this.eRent) {
        return `${this.eRent.toLocaleString()} ~ ${(this.eRent + 5000).toLocaleString()}円/坪`;
      }
      return 'agentにお問い合わせください';
    },
    judgeAskingRentForAgent() {
      if (this.asking.askingRent) {
        return `${this.asking.askingRent.toLocaleString()}円/坪`;
      }
      if (this.eRent) {
        return `${this.eRent.toLocaleString()} ~ ${(this.eRent + 5000).toLocaleString()}円/坪`;
      }
      return '未定';
    },
  },
};
