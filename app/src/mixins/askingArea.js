export default {
  methods: {
    askingAreaAddUnitTwoPaterns(askingArea) {
      return this.askingAreaAddUnit(askingArea) + this.askingAreaSqAddUnit(askingArea);
    },
    askingAreaAddUnit(askingArea) {
      return `${(Math.round(askingArea * 10) / 10).toLocaleString()}坪`;
    },
    askingAreaSqAddUnit(askingArea) {
      return `（${(Math.round(askingArea * 3.30579 * 10) / 10).toLocaleString()}㎡）`;
    },
  },
};
