<template>
  <div class="o-homeMain">
    <Feature
      v-if="!isOfferExist"
      class="o-homeMain__item"
    />
    <OfferEmpty
      v-if="!isOfferExist"
      class="o-homeMain__item"
    />
    <div class="o-homeMain__item">
      <TimeLineTab
        :is-offer-exist="isOfferExist"
        :active-tab="activeTab"
        @change-tab="onChangeTab"
      />
      <Activity
        v-if="(this.activeTab === 1)"
        :activities="activities"
        @add-activities="addActivities"
        @create-download-log="createDownloadLog"
      />
      <Offering
        v-else-if="(this.activeTab === 2)"
        :offers="offers"
        @add-offers="addOffers"
        @create-download-log="createDownloadLog"
      />
    </div>
  </div>
</template>

<script>
import Feature from './Feature';
import OfferEmpty from './OfferEmpty';
import Activity from './Activity';
import TimeLineTab from './TimeLineTab';
import Offering from './Offering';

export default {
  components: {
    Feature,
    OfferEmpty,
    Activity,
    TimeLineTab,
    Offering,
  },
  data() {
    return {
      dataCount: 10,
      activeTab: 1,
    };
  },
  props: {
    showCountLabels: {
      type: Object,
      default: () => {},
    },
    isOfferExist: {
      type: Boolean,
      default: false,
    },
    reactedBuildings: {
      type: Object,
      default: () => {},
    },
    activities: {
      type: Array,
      default: () => [],
    },
    offers: {
      type: Array,
      default: () => [],
    },
    cancelLike: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    createDownloadLog(offerId) {
      this.$emit('create-download-log', offerId);
    },
    addActivities($state) {
      this.$emit('add-activities', $state);
    },
    addOffers($state) {
      this.$emit('add-offers', $state);
    },
    onChangeTab(num) {
      this.activeTab = num;
    },
  },
};
</script>

<style lang="scss" scoped>
.o-homeMain {
  @include o-homeMain;
}
</style>
