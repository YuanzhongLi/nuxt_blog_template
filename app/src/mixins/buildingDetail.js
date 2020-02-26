export default {
  data() {
    const { building } = this;
    const buildingInfo = {
      story: building.story,
      completedOn: `${building.completedOn}`,
      grossFloorArea: building.grossFloorArea,
      standardFloorArea: building.standardFloorArea,
      floorHeight: building.floorHeight,
      explanation: building.explanation,
    };
    const station = {
      stationName: building.stationName,
      timeRequired: building.timeRequired,
    };
    const buildingImgUrls = building.imageUrls;
    return {
      buildingInfo,
      station,
      buildingImgUrls,
      layoutImgUrlList: [building.layoutImgUrl1],
      isModalShow: false,
    };
  },
  computed: {
    firstBuildingImgUrl() {
      return this.buildingImgUrls['1'];
    },
    secondImgUrl() {
      return this.buildingImgUrls['2'];
    },
  },
  props: {
    building: {
      type: Object,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    similarBuildings: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    askingLikeById(id) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        this.$emit('asking-like-by-id', id);
      }
    },
    askingDislikeById(id) {
      if (!this.isLoggedIn) {
        this.showSignupModal();
      } else {
        this.$emit('asking-dislike-by-id', id);
      }
    },
    showSignupModal() {
      this.isModalShow = true;
    },
    closeSignUpModal() {
      this.isModalShow = false;
    },
  },
};
