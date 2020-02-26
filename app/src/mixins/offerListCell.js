export default {
  computed: {
    uniqueLikeBuildingNames() {
      const { offerAskings } = this.data;
      const likeBuildingNames = offerAskings
        .filter(offerAsking => offerAsking.likeStatus === 1)
        .map(offerAsking => offerAsking.name);
      const uniqueLikeBuildingNames = Array.from(new Set(likeBuildingNames));
      return uniqueLikeBuildingNames;
    },
    uniqueDisLikeBuildingNames() {
      const { offerAskings } = this.data;
      const disLikeBuildingNames = offerAskings
        .filter(offerAsking => offerAsking.likeStatus === 0)
        .map(offerAsking => offerAsking.name);
      const uniqueDisLikeBuildingNames = Array.from(new Set(disLikeBuildingNames))
        .filter(disLikeBuildingName => !(this.uniqueLikeBuildingNames.includes(disLikeBuildingName)));
      return uniqueDisLikeBuildingNames;
    },
  },
};
