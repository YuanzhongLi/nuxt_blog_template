<template>
  <div>
    <EmapSP
      v-if="device.isMobile"
      :offered-listing="offeredListing"
      :liked-listing="likedListing"
      :ave-coordinate="aveCoordinate"
      :show-all-buildings="showAllBuildings"
      @toggle-info-window="toggleInfoWindow"
      :pinned-building="pinnedBuilding"
      @focusout-item="focusoutItem"
      @select-item="selectItem"
      :like="like"
      :dismiss="dismiss"
      :demands="demands"
      :stations="stations"
      @get-stations="getStations"
      @update-tenant-demands="updateTenantDemands"
      :search="search"
    />
    <EmapPC
      v-else
      :offered-listing="offeredListing"
      :liked-listing="likedListing"
      :ave-coordinate="aveCoordinate"
      :show-all-buildings="showAllBuildings"
      :other-buildings="otherBuildings"
      @toggle-info-window="toggleInfoWindow"
      :pinned-building="pinnedBuilding"
      @focusout-item="focusoutItem"
      @select-item="selectItem"
      :like="like"
      :dismiss="dismiss"
      :demands="demands"
      :stations="stations"
      @get-stations="getStations"
      @update-tenant-demands="updateTenantDemands"
      :recommend-count="recommendCount"
      :building-per-page="buildingPerPage"
      @change-page="fetchRecommend"
      :search="search"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import notification from '~/mixins/notification';
import eMap from '~/mixins/eMap';
import webpush from '~/mixins/webpush';
import EmapPC from '~/components/templates/office_pc/e-map';
import EmapSP from '~/components/templates/office_sp/e-map';

import { median } from '~/utils/median';

export default {
  layout: ({ isMobile }) => {
    if (isMobile) return 'simple';
    return 'tenant_pc_emap';
  },
  components: {
    EmapPC,
    EmapSP,
  },
  computed: {
    ...mapState(['device', 'tenant']),
  },
  async created() {
    if (process.client) {
      this.openLoadingModal();
      await this.$store.dispatch('search/search');
      this.closeLoadingModal();
    }
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  mixins: [notification, eMap, webpush],
  middleware: ['injectDevice', 'injectTenant'],
  async asyncData({ app, store }) {
    const client = app.$axios.withAccessToken(store.state.tenantToken);
    const [likedListingRes, offeredListingRes, demands, stations] = await Promise.all([
      client.$get('buildings/favorites'),
      client.$get('askings/recommend'),
      client.$get('tenant/demand'),
      client.$get('/stations/'),
    ]);
    const sum = (previousValue, currentValue) => previousValue + currentValue;
    const aveCoordinate = {
      lat: 35.689634,
      lng: 139.692101,
    };
    const likedListing = likedListingRes.buildings;
    const offeredListing = offeredListingRes.listing;
    const listings = offeredListing.concat(likedListing);
    if (listings.length > 0) {
      aveCoordinate.lat = listings.map(i => i.latitude).reduce(sum, 0) / listings.length;
      aveCoordinate.lng = listings.map(i => i.longitude).reduce(sum, 0) / listings.length;
    }
    return {
      demands: demands.demand,
      aveCoordinate,
      offeredListing,
      likedListing,
      recommendCount: offeredListingRes.count,
      stations: stations.stations,
    };
  },
  data() {
    return {
      otherBuildings: [],
      showAllBuildings: false,
      showLoadingModal: false,
      offeredListing: [],
      likedListing: [],
      stations: [],
      pinnedBuilding: {
        id: 0,
        name: '',
        imageUrls: [],
        askings: [],
      },
      recommendCount: 0,
      buildingPerPage: 10,
    };
  },
  methods: {
    async search() {
      this.openLoadingModal();
      await this.$store.dispatch('search/search');
      this.closeLoadingModal();
    },
    async fetchRecommend(page) {
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const res = await client.$get('askings/recommend', {
        params: {
          page,
          buildingPerPage: this.buildingPerPage,
        },
      });
      this.offeredListing = res.listing;
      this.recommendCount = res.count;
      this.closeLoadingModal();
    },
    async getStations() {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const stations = await client.$get('/stations/');
      this.stations = stations;
    },
    async toggleInfoWindow(buildingId, mapRef) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { building } = await client.$get(`/buildings/search/${buildingId}`);
      if (building) {
        this.selectItem(building, mapRef);
      }
    },
    async dismiss(askingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const isLike = 0;
      try {
        await this.handleLikeAPI(askingId, isLike);
        const offeredListing = await client.$get('askings/recommend');
        this.setNotificationMessage('success', '興味なしに登録しました。');
        this.offeredListing = offeredListing.listing;
      } catch (error) {
        this.setNotificationMessage('error', '興味なしに失敗しました');
      }
      this.closeLoadingModal();
    },
    selectItem(item, mapRef) {
      this.pinnedBuilding = item;
      mapRef.$mapPromise.then((map) => { // ピンを地図の中心に移動
        map.panTo({ lat: item.latitude, lng: item.longitude });
      });
    },
    focusoutItem() {
      this.pinnedBuilding = {
        id: 0,
        name: '',
        imageUrls: [],
        askings: [],
      };
    },
    async like(askingId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const isLike = 1;
      try {
        await this.handleLikeAPI(askingId, isLike);
        const [likedListing, offeredListing] = await Promise.all([
          client.$get('buildings/favorites'),
          client.$get('askings/recommend'),
        ]);
        this.setNotificationMessage('success', '興味ありに登録しました');
        this.offeredListing = offeredListing.listing;
        this.likedListing = likedListing.buildings;
        this.recommendCount = offeredListing.count;
      } catch (error) {
        this.setNotificationMessage('error', '興味ありに失敗しました');
      }
      this.closeLoadingModal();
    },
    async handleLikeAPI(askingId, isLike) {
      const { tenantId } = this.$store.state.tenant;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const requestbody = {
        tenantId,
        askingId,
        isLike,
      };
      const { error } = await client.$post('/askings/like', requestbody);
      return error;
    },
    async updateTenantDemands(editingDemands) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      this.openLoadingModal();
      const { error } = await client.$post('tenant/demand', editingDemands);
      if (error) {
        this.setNotificationMessage('error', error);
        this.closeLoadingModal();
        return;
      }

      const [offeredListing, demands] = await Promise.all([
        client.$get('askings/recommend'),
        client.$get('tenant/demand'),
      ]);
      this.demands = demands.demand;
      const aveCoordinate = {
        lat: 35.689634,
        lng: 139.692101,
      };
      const listings = offeredListing.listing.concat(this.likedListing);
      if (listings.length > 0) {
        aveCoordinate.lat = median(listings.map(i => i.latitude));
        aveCoordinate.lng = median(listings.map(i => i.longitude));
      }
      this.aveCoordinate = aveCoordinate;
      this.offeredListing = offeredListing.listing;
      this.recommendCount = offeredListing.count;
      this.closeLoadingModal();
      this.setNotificationMessage('success', '登録情報の変更に成功しました');
    },
  },
};
</script>
