<template>
  <div>
    <TenantSP
      v-if="device.isMobile"
      :activities="activities"
      :offers="offers"
      :is-offer-exist="isOfferExist"
      :offered-listing="offeredListing"
      :reacted-buildings="reactedBuildings"
      :like="like"
      :dismiss="dismiss"
      :cancel-like="cancelLike"
      :demands="demands"
      :stations-list="stationsList"
      :is-logged-in="isLoggedIn"
      @add-offers="addOffers"
      @add-activities="addActivities"
      @create-download-log="createDownloadLog"
      @update-tenant-demands="updateTenantDemands"
      :search="search"
      :update-is-consent-term="updateIsConsentTerm"
    />
    <TenantPC
      v-else
      :activities="activities"
      :offers="offers"
      :is-offer-exist="isOfferExist"
      :offered-listing="offeredListing"
      :reacted-buildings="reactedBuildings"
      :like="like"
      :dismiss="dismiss"
      :cancel-like="cancelLike"
      :demands="demands"
      :stations-list="stationsList"
      :is-logged-in="isLoggedIn"
      @add-activities="addActivities"
      @add-offers="addOffers"
      @create-download-log="createDownloadLog"
      @update-tenant-demands="updateTenantDemands"
      :search="search"
      :update-is-consent-term="updateIsConsentTerm"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import log from '~/utils/log';
import siteinfo from '~/mixins';
import notification from '~/mixins/notification';
import webpush from '~/mixins/webpush';
import TenantPC from '~/components/templates/tenant_pc';
import TenantSP from '~/components/templates/tenant_sp';

/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

export default {
  layout: ctx => (ctx.isMobile ? 'tenant_sp' : 'tenant_pc'),
  components: {
    TenantPC,
    TenantSP,
  },
  middleware: ['injectDevice', 'injectTenant', 'tenantAuthenticated'],
  computed: {
    ...mapState(['device', 'tenant']),
    ...mapState('search', ['conditions']),
    isLoggedIn() {
      return this.$store.state.tenant.isLoggedIn;
    },
  },
  fetch({ store, route }) {
    store.commit('setLastVisitedPath', route.fullPath);
  },
  async asyncData({ app, store }) {
    const initialDataCount = 10;
    const client = app.$axios.withAccessToken(store.state.tenantToken);
    try {
      const [stationsList, demands, activities, offers, { listing }] = await Promise.all([
        client.$get('stations'),
        client.$get('tenant/demand'),
        client.$get(`tenant/activities/all?maxCount=${initialDataCount}`),
        client.$get(`tenant/activities/offers?maxCount=${initialDataCount}`),
        client.$get('askings/recommend'),
      ]);
      return {
        stationsList: stationsList.stations,
        demands,
        activities: activities.activities,
        isOfferExist: !(offers.offers.length === 0),
        offers: offers.offers,
        offeredListing: listing,
      };
    } catch (e) {
      log.error(e);
      return { error: 'データの取得に失敗しました' };
    }
  },
  mixins: [siteinfo, notification, webpush],
  data() {
    return {
      reactedBuildings: {},
      offeredListing: [],
      activitiesCount: 10,
      offersCount: 10,
    };
  },
  methods: {
    async search() {
      if (this.conditions.prefectures.length + this.conditions.wards.length === 1) {
        if (this.conditions.prefectures.length === 1) {
          const res = await this.$axios.get(`/prefectures/${this.conditions.prefectures[0].id}`);
          this.$router.push(`/office/${res.data.prefecture.enName}/result`);
        } else {
          const wardRes = await this.$axios.get(`/wards/${this.conditions.wards[0].id}`);
          const prefectureRes = await this.$axios.get(`/prefectures/${wardRes.data.ward.prefectureId}`);
          this.$router.push(`/office/${prefectureRes.data.prefecture.enName}/${wardRes.data.ward.enName}/result`);
        }
      } else {
        this.$router.push('/office/result');
      }
    },
    async like(id) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const isLike = 1;
      try {
        await this.handleLikeAPI(id, isLike);
        this.setNotificationMessage('success', '興味ありに登録しました');
        const [offeredListing] = await Promise.all([
          client.$get('askings/recommend'),
        ]);
        this.offeredListing = offeredListing.listing;
      } catch (error) {
        this.setNotificationMessage('error', '興味ありに失敗しました');
        this.closeLoadingModal();
      }
      this.closeLoadingModal();
    },
    async dismiss(id) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      try {
        const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
        const isLike = 0;
        await this.handleLikeAPI(id, isLike);
        const [offeredListing] = await Promise.all([
          client.$get('askings/recommend'),
        ]);
        this.setNotificationMessage('success', '興味なしに登録しました');
        this.offeredListing = offeredListing.listing;
      } catch (error) {
        this.setNotificationMessage('error', '興味なしに失敗しました');
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
    async cancelLike(likeId) {
      this.resetNotificationMessage();
      this.openLoadingModal();
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { error } = await client.$post('/tenant/cancel_like', {
        likeId,
      })
        .catch((err) => {
          log.error(err);
          return { error: '興味なしの解除に失敗しました' };
        });

      if (error) {
        this.closeLoadingModal();
        this.setNotificationMessage('error', error);
        return;
      }
      const [reactedBuildings, offeredListing] = await Promise.all([
        client.$get('tenant/get_reacted_buildings'),
        client.$get('tenant/get_index_counts'),
        client.$get(`tenant/get_listing_offers/${3}`),
      ]).catch((err) => {
        log.error(err);
        return { error: 'データの取得に失敗しました' };
      });
      this.reactedBuildings = reactedBuildings;
      this.offeredListing = offeredListing;
      this.closeLoadingModal();
    },
    async updateIsConsentTerm() {
      try {
        await this.$axios.put('tenant/update_is_consent_term', {
          isConsentTerm: 1,
        });
        // tenantのrefetch
        await this.$store.dispatch('tenant/injectTenantData', {
          app: this,
          tenantAccessToken: this.$store.state.tenantToken,
        });
      } catch (error) {
        this.setNotificationMessage('error', error);
      }
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

      this.demands = await client.$get('tenant/demand');
      this.closeLoadingModal();
      this.setNotificationMessage('success', '登録情報の変更に成功しました');
    },
    async createDownloadLog(pdfOfferId) {
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const { error } = await client.$post('/tenant/create_download_log', {
        offerId: pdfOfferId,
      })
        .catch((err) => {
          log.error(err);
          return { error: '変更に失敗しました' };
        });
      if (error) {
        this.setNotificationMessage('error', error);
      }
    },
    async addActivities($state) {
      if (this.activities.count < this.activitiesCount) {
        $state.complete();
      } else {
        const numberOfActivitiesToAdd = 5;
        this.activitiesCount += numberOfActivitiesToAdd;
        const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
        const fetchedActivities = await client.$get(`tenant/activities/all?maxCount=${this.activitiesCount}`).catch((err) => {
          log.error(err);
          return { error: 'データの取得に失敗しました' };
        });
        if (fetchedActivities.activities.length < (this.activitiesCount - numberOfActivitiesToAdd)) {
          $state.complete();
        } else {
          this.activities = fetchedActivities.activities;
          $state.loaded();
        }
      }
    },
    async addOffers($state) {
      const numberOfOffersToAdd = 5;
      this.offersCount += numberOfOffersToAdd;
      const client = this.$axios.withAccessToken(this.$store.state.tenantToken);
      const fetchedOffers = await client.$get(`tenant/activities/offers?maxCount=${this.offersCount}`).catch((err) => {
        log.error(err);
        return { error: 'データの取得に失敗しました' };
      });
      if (fetchedOffers.offers.length < (this.offersCount - numberOfOffersToAdd)) {
        $state.complete();
      } else {
        this.offers = fetchedOffers.offers;
        $state.loaded();
      }
    },
  },

};
</script>
