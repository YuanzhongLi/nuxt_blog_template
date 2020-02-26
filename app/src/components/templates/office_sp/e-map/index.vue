<template>
  <section class="p-emap p-emap--sp">
    <MobileHeader />
    <TenantMobileTab v-if="isLoggedIn" />
    <div class="p-emap__main">
      <BuildingSwiper
        :offered-listing="offeredListing"
        :liked-listing="likedListing"
        :pinned-building="pinnedBuilding"
        @select-item="selectItem"
        :like="like"
        :dismiss="dismiss"
      />
      <GmapMap
        class="p-emap__cntMap"
        ref="mapRef"
        :center="aveCoordinate"
        :zoom="13"
        :options="gMapOptions"
        map-type-id="roadmap"
      >
        <GmapInfoWindow
          :opened="pinClicked"
          @closeclick="pinClicked=false"
          :position="infoWindowPos"
          :options="infoOptions"
        >
          <ListingPopup :building="pinnedBuilding" />
        </GmapInfoWindow>
        <GmapMarker
          v-for="(building, index) in offeredListing"
          :key="'Recommends-'+index"
          :position="{ lat: building.latitude, lng: building.longitude }"
          :clickable="true"
          @click="selectItem(building)"
          :icon="(building.id===pinnedBuilding.id)?focusIcon:normalIcon"
        />
        <GmapMarker
          v-for="(building, index) in likedListing"
          :key="'Others-'+index"
          :position="{ lat: building.latitude, lng: building.longitude }"
          :clickable="true"
          @click="selectItem(building)"
          :icon="(building.id===pinnedBuilding.id)?focusIcon:favoriteIcon"
        />
        <GmapMarker
          v-for="(building, index) in this.showAllBuildings?this.otherBuildings:[]"
          :key="'Others-'+index"
          :position="{ lat: building.latitude, lng: building.longitude }"
          :clickable="true"
          @click="toggleInfoWindow(building.id)"
          :icon="(building.id===pinnedBuilding.id)?focusIcon:otherIcon"
        />
      </GmapMap>
    </div>
  </section>
</template>

<script>
import eMap from '~/mixins/eMap';

import ListingPopup from '~/components/elements/e-map/ListingPopup';
import MobileHeader from '~/components/elements/common/sp/MobileHeader';
import TenantMobileTab from '~/components/elements/common/sp/TenantMobileTab';
import BuildingSwiper from '~/components/elements/e-map/sp/BuildingSwiper';

export default {
  components: {
    MobileHeader,
    TenantMobileTab,
    BuildingSwiper,
    ListingPopup,
  },
  head() {
    return {
      bodyAttrs: {
        class: 'is-fixed',
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
  mixins: [eMap],
  props: {
    showAllBuildings: {
      type: Boolean,
      default: false,
    },
    offeredListing: {
      type: Array,
      default: () => [],
      required: true,
    },
    likedListing: {
      type: Array,
      default: () => [],
    },
    aveCoordinate: {
      type: Object,
      required: true,
    },
    pinnedBuilding: {
      type: Object,
      default: () => {},
    },
    like: {
      type: Function,
      default: () => {},
    },
    dismiss: {
      type: Function,
      default: () => {},
    },
    search: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      pinClicked: false,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
    };
  },
  methods: {
    focusoutItem() {
      this.pinClicked = false;
      this.$emit('focusout-item');
    },
    selectItem(item) {
      const { mapRef } = this.$refs;
      this.infoWindowPos = {
        lat: item.latitude,
        lng: item.longitude,
      };
      this.pinClicked = true;
      this.$emit('select-item', item, mapRef);
    },
    toggleInfoWindow(item) {
      const { mapRef } = this.$refs;
      this.infoWindowPos = {
        lat: item.latitude,
        lng: item.longitude,
      };
      this.pinClicked = true;
      this.$emit('toggle-info-window', item, mapRef);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-emap {
  @include p-emap;
}
</style>
